import React, { Component } from 'react';
import { Text,  View, TouchableOpacity, ScrollView, Alert, ListView, Platform, AsyncStorage, PermissionsAndroid } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import Login from '../components/users/Login';
import api, {key} from '../api';
import LoadingComponent from '../components/core/Loader';
import common from '../style/common';
import DestinationList from '../components/destination/DestinationList';
import {selectDestination} from '../actions';

class Trip extends Component {
  constructor(props) {
    super(props);
    this.fetchDestinations = this.fetchDestinations.bind(this);
    this.state = {
      loading: false,
      destinations: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Viaje',
    headerBackTitleStyle: {
      color: '#e5e5e5'
    },
    headerTintColor: '#e5e5e5',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20
   },
   headerRight: (
     <TouchableOpacity onPress={() => navigation.state.params.startHelp()}>
       <Icon size={35} color="white" name={'help-outline'} />
     </TouchableOpacity>
   ),
   headerStyle: {
      backgroundColor: '#C63C22'
   }
  });

  componentWillMount() {
    this.fetchDestinations();
    this.props.navigation.setParams({
      startHelp: () => this.startHelp()
    });
  }

  startHelp() {
    Alert.alert('Ayuda:', 'Siempre estamos para ayudarte, ponte en contacto con nosotros si lo consideras necesario.', [
      {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Solicitar Efectivo para cuenta', onPress: () => this.requestCash()},
      {text: 'Enviar Correo', onPress: () => Communications.email(['contacto@lookatmobile.com'], null, null, 'Necesito ayuda (lookatDelivery)', 'Hola, he tenido un problema: *Describe bien el problema que se ha presentado y danos una manera de comunicarnos rapidamente contigo*')},
    ]);
  }

  requestCash() {
    if(this.props.actualTrip.cash === 1) {
      AsyncStorage.getItem(key).then((checkSession) => {
        api.loan.requestLoan(JSON.parse(checkSession).token, this.props.actualTrip.idTrip)
        .then(response => response.json())
        .then((rjson) => {
          Alert.alert('Danos unos minutos', 'Estamos resolviendo tu solicitud, en unos momentos te notificaremos.', [
            {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          ]);
        })
      });
    } else {
      Alert.alert('No te preocupes', 'No podemos depositarte ya que este viaje sera pagado a través de la plataforma.', [
        {text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ]);
    }
  }

  fetchDestinations() {
    const props = this.props;
    api.destination.trip({ id: props.actualTrip.idTrip, token: this.props.user.token })
    .then(response => response.json())
    .then((rjson) => {
      const destinations = rjson.data;
      console.log(destinations)
      if(destinations[0].checked === 0) {
        this.props.selectDestination(1)
      } else {
        this.props.selectDestination(2)
      }
      this.setState({
        destinations,
        loading: false
      })
    })
  }

  render() {
    const props = this.props;
    const state = this.state
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <LoadingComponent visible={this.state.loading} />
        <ScrollView style={common.columnContainerReviw}>
          <DestinationList onRefresh={this.fetchDestinations} destinations={state.destinations} navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({actualTrip, user}) => {
  return {actualTrip, user}
}

export default connect(mapStateToProps, {selectDestination})(Trip);
