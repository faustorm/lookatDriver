import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, RefreshControl, Alert, ListView, Platform, AsyncStorage, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import Login from '../components/users/Login';
import * as actions from '../actions';
import api, {key} from '../api';
import LoadingComponent from '../components/core/Loader';
import {ConfirmButton} from '../components/core/ConfirmButton';
import TripCard from '../components/trips/TripCard';
import FullTrip from '../components/trips/FullTrip';
import common from '../style/common';

class App extends Component {
  constructor(props) {
    super(props);
    const tripsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const courseDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.onSubscribeTrip = this.onSubscribeTrip.bind(this);
    this.manageActual = this.manageActual.bind(this);
    this.checkLogIn = this.checkLogIn.bind(this);
    this.state = {
      tripsDataSource: tripsDataSource.cloneWithRows([]),
      courseDataSource: courseDataSource.cloneWithRows([]),
      loading: true,
      logging: false,
      refreshing: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'lookatDriver',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20
   },
   headerRight: (
     <TouchableOpacity onPress={() => navigation.navigate('Account')}>
       <Icon size={35} color="white" name={'account-circle'} />
     </TouchableOpacity>
   ),
   headerLeft: null,
   headerStyle: {
      backgroundColor: '#C63C22'
   }
  });

  //*
  //In case of android
  //*
  androidPermissionLocation = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Error', 'Para acceder a los servicios de la aplicación, es necesario permitir el acceso a tu ubicación. Revisa la configuración de tu celular.', [{ text: 'OK' }]);
    }
  }

  componentWillMount() {
    if(Platform.OS === 'android' && parseFloat(DeviceInfo.getSystemVersion()) >= 6) {
      this.androidPermissionLocation();
    }
    this.checkLogIn();
    this.registerPushToken();
    this.onRefresh();
  }

  //*
  //Pushwoosh
  //*
  registerPushToken() {
    Pushwoosh.init({
      'pw_appid': '20AD1-421B1',
      'project_number': '743756328639',
    });
    Pushwoosh.register(
      (token) => {
        Pushwoosh.setApplicationIconBadgeNumber(0);
        AsyncStorage.setItem('pushToken', token);
        AsyncStorage.getItem(key).then((checkSession) => {
          if (checkSession) {
            const data = {
              token: JSON.parse(checkSession).token,
              user: {
                pushToken: token,
                device: Platform.OS === 'ios' ? 2 : 1,
                version: '2.0.0'
              },
            };
            api.user.updateUserDeviceInfo(data)
          }
        });
      },
      (error) => {
        Alert.alert('Error', 'Revisa tu conexión de Internet y vuelve a intentar',[{ text: 'Configuración', onPress: () => Linking.openURL('app-settings:') },{ text: 'OK',}],);
      },
    );
  }


  checkLogIn() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.user.userInfo(accessToken)
        .then(response => response.json())
        .then((rjson) => {
          if(rjson.data !== null) {
            this.driverEntered(accessToken);
            this.props.userEntered(rjson.data);
            this.onRefresh();
            this.setState({ logging: false, loading: false})
          } else {
            this.setState({ logging: true, loading: false })
            AsyncStorage.removeItem(key)
          }
        })
        .catch(() => {
          this.setState({ logging: true, loading: false })
          AsyncStorage.removeItem(key)
        })
      } else {
        this.setState({ loading: false, logging: true})
      }
    });
  }

  //*
  // Get driver info and status
  //*
  driverEntered(accessToken) {
    api.driver.profile(accessToken)
    .then(response => response.json())
    .then((rjson) => {
      if(rjson.data !== null) {
        this.props.driverEntered(rjson.data);
      }
    })
  }

  //*
  //Check if there is on course trips
  //*
  manageActual() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.trip.current(accessToken)
        .then(response => response.json())
        .then((rjson) => {
          console.log(rjson);
          const courseDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.setState({
            courseDataSource: courseDataSource.cloneWithRows(rjson.data),
          })
          this.props.loadTrips(rjson.data);
        })
      }
    });
  }

  //*
  // Analyze if need to render new data
  //*
  componentWillUpdate(nextProps) {
    if(this.props.driver.available !== nextProps.driver.available) {
      this.onRefresh();
    }
  }

  //*
  // Near trips
  //*
  getFunctionalData(callback) {
    const {lat, lng} = this.props.location;
    api.trip.near({lat, lng})
    .then(response => response.json())
    .then((rjson) => {
      console.log(rjson);
      this.setState({
        tripsDataSource: this.state.tripsDataSource.cloneWithRows(rjson.data),
        loading: false,
        refreshing: false
      })
    })
  }

  //*
  // Subscribe to trip
  //*
  onSubscribeTrip(info) {
    this.props.onCourseTrip(info);
    this.props.actualTrip(info);
    this.props.driverOccupied(0);
    this.props.navigation.navigate('Trip');
  }

  //*
  //Load Trips list
  //*
  renderTrip(rowData) {
    return (
      <TripCard trip={rowData} key={rowData.id} subscribe={this.onSubscribeTrip}/>
    )
  }

  //*
  //Load Course list
  //*
  renderCourse(rowData) {
    return (
      <FullTrip key={rowData.id} navigator={this.props.navigation} trip={rowData} />
    )
  }

  activateDriver() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.driver.activeDriver(accessToken, 1)
        .then(response => response.json())
        .then((rjson) => {
          this.driverEntered(accessToken);
        })
      }
    });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    navigator.geolocation.getCurrentPosition((location) => {
      const {longitude, latitude} = location.coords;
      this.props.locationChanged({longitude, latitude});
      this.setState({ refreshing: false });
      this.getFunctionalData();
      this.manageActual();
    })
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <LoadingComponent visible={this.state.refreshing} />
        <Login visible={this.state.logging} closeAction={() => this.checkLogIn()}/>
        <ScrollView style={common.columnContainerReviw} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onRefresh()}
          />
        }>
          {this.props.driver.active === 0 ?
            <ConfirmButton onClick={() => this.activateDriver()} children={'Recibir Pedidos'}/>
            :
            undefined
          }
          <ListView
            horizontal={false}
            dataSource={this.state.courseDataSource} renderRow={this.renderCourse.bind(this)}
            enableEmptySections
          />
          {this.props.courseTrips.length < 3 && this.props.driver.active && this.state.tripsDataSource.getRowCount() !== 0?
            <View>
              <Text style={common.productTitle}>Viajes Disponibles</Text>
              <ListView
                horizontal={false}
                dataSource={this.state.tripsDataSource} renderRow={this.renderTrip.bind(this)}
                enableEmptySections
              />
            </View>
            :
            undefined
          }
          {this.state.tripsDataSource.getRowCount() === 0 && this.props.courseTrips.length === 0 && this.state.refreshing === false?
            <Text style={common.productTitle}>No hay viajes disponibles actualmente</Text>
            :
            undefined
          }
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({location, user, courseTrips, driver}) => {
  return {location, courseTrips, user, driver}
}

export default connect(mapStateToProps, actions )(App);
