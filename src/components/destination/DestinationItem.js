import React, {Component} from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, TouchableHighlight, Linking, Alert, AsyncStorage } from 'react-native';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import api, {key} from '../../api';
import styles from '../../style/Cards';
import common from '../../style/common';
import { CardSection } from '../core/CardSection';
import { HelperButton } from '../core/HelperButton';
import { ConfirmButton } from '../core/ConfirmButton';
import {selectDestination, completedTrip, driverOccupied} from '../../actions';

class DestinationItem extends Component {
  constructor(props) {
    super(props);
    this.goToMap = this.goToMap.bind(this);
    this.phoneCall = this.phoneCall.bind(this);
    this.preCompleteOne = this.preCompleteOne.bind(this);
    this.preCompleteTwo = this.preCompleteTwo.bind(this);
  }

  goToMap() {
    const url = `https://maps.google.com/maps?q=${this.props.destination.lat},${this.props.destination.lng}`;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK' }]);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK' }]));
  }

  phoneCall() {
    if(this.props.destination.sequence === 1 || this.props.destination.sequence === 3 ) {
      Communications.phonecall(this.props.actualTrip.placeNumber, true)
    } else {
      Communications.phonecall(this.props.actualTrip.phoneNumber, true)
    }
  }

  //*
  //Complete Sequence 1
  //*
  preCompleteOne() {
    Alert.alert('¿Has recogido la comida?', 'A continuación deberas entregar la comida al cliente, en este momento notificaremos que ya estas en camino.', [{ text: 'OK', onPress: () => this.updateTrip()}])
  }

  //*
  //Complete sequence 2
  //*
  preCompleteTwo() {
    if(this.props.actualTrip.cash === 1) {
      const props = this.props;
      console.log(props);
      const message = `Gracias por realizar la misión de satisfacer el antojo de ${props.actualTrip.name}`;
      Alert.alert('¡Gracias!', message, [{ text: 'Terminar Viaje', onPress: () => this.updateTrip()}]);
    } else {
      const props = this.props;
      const message = `Depositaremos el dinero completo de este viaje a tu cuenta, gracias por contribuir en la satisfacción de ${props.actualTrip.name}.`;
      Alert.alert('¡Gracias!', message, [{ text: 'Terminar Viaje', onPress: () => this.updateTrip()}]);
    }
  }

  //*
  //Update Trip Status
  //*
  updateTrip() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.destination.check({id: this.props.destination.id, token: accessToken, trip: this.props.destination.idTrip})
        .then(response => response.json())
        .then((rjson) => {
          this.props.onRefresh();
          this.nextStep();
        })
      } else {
        this.setState({ loading: false, logging: true})
      }
    });
  }

  //*
  //Analyze next step
  //*

  nextStep() {
    const {destination, actualTrip} = this.props;
    if(destination.sequence === 1) {
      this.props.selectDestination(2)
    } else if (destination.sequence === 2) {
      this.finishTrip()
    }
  }

  finishTrip(cash) {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.trip.finish({id: this.props.actualTrip.idTrip, token: accessToken})
        .then((response) => {
          this.props.navigation.navigate('Home');
          this.props.driverOccupied(1);
          this.props.completedTrip(this.props.actualTrip.idTrip);
        })
      } else {
        this.setState({ loading: false, logging: true})
      }
    });
  }

  renderMap() {
    const {destination, expanded, actualTrip } = this.props;
    const initialRegion = {
      latitude: destination.lat,
      longitude: destination.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }
    const name = actualTrip.name
    if(expanded) {
      return (
        <View style={{paddingHorizontal: 5, borderBottomWidth: 1, borderColor: '#828282', paddingVertical: 5}}>
          <CardSection >
            <MapView
              style={styles.map}
              initialRegion={initialRegion}
              zoomEnabled={true}
              rotateEnabled={true}
              scrollEnabled={true}
              pitchEnabled={true}
              liteMode
            >
              <MapView.Marker
                coordinate={{
                  latitude: destination.lat,
                  longitude: destination.lng,
                }}
                title={destination.address}
                description={destination.address}
              />
            </MapView>
          </CardSection>
          <Text>
            <Text style={styles.sectionText}>Dirección: </Text>
            <Text style={styles.subText}>{destination.address}</Text>
          </Text>
          {destination.indications ?
            <Text>
              <Text style={styles.sectionText}>Indicaciones: </Text>
              <Text style={styles.subText}>{destination.indications} </Text>
            </Text>
            :
            undefined
          }
          {destination.checked === 0 && (destination.sequence == 1 || destination.sequence == 2 ) ?
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <HelperButton children={'Llamar'} onClick={() => this.phoneCall()}/>
              <HelperButton children={'Abrir Mapa'} onClick={() => this.goToMap()}/>
            </View>
            :
            undefined
          }
          {actualTrip.cash === 1 && destination.sequence === 1?
            <View style={styles.sectionCard}>
              <Text style={styles.moneyText}>Deberas pagar:</Text>
              <Text style={styles.money}>${actualTrip.amount} MXN</Text>
            </View>
            :
            undefined
          }
          {actualTrip.cash === 1 && destination.sequence === 2?
            <View style={styles.sectionCard}>
              <Text style={styles.moneyText}>{name} te dara:</Text>
              <Text style={styles.money}>${actualTrip.amount + 40} MXN</Text>
            </View>
            :
            undefined
          }
          {actualTrip.cash === 0 ?
            <View style={styles.sectionCard}>
              <Text style={styles.moneyText}>La orden ya esta pagada, te depositaremos los $35 MXN</Text>
            </View>
            :
            undefined
          }
          {destination.sequence === 1 && destination.checked === 0 ? <ConfirmButton children={'Ya recogi la comida'} onClick={this.preCompleteOne} /> : undefined}
          {destination.sequence === 2 && destination.checked === 0 ? <ConfirmButton children={'Ya entregué la comida'} onClick={this.preCompleteTwo} /> : undefined}
        </View>
      );
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const destination = this.props.destination;
    const trip = this.props.actualTrip;
    return(
      <TouchableWithoutFeedback onPress={() => this.props.selectDestination(destination.sequence)}>
        <View>
          <CardSection>
            <Text style={destination.checked ? styles.checkedTitle : styles.titleSection}>
              {destination.sequence === 1 ? `Recoge la comida de ${trip.place}, a nombre de ${destination.name}` : undefined }
              {destination.sequence === 2 ? `Deja la comida en la casa de ${destination.name}` : undefined }
            </Text>
          </CardSection>
          {this.props.actualTrip.place ? this.renderMap() : undefined}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const actualTrip = state.actualTrip;
  const driver = state.driver;
  const expanded = state.destinationZoom === ownProps.destination.sequence
  return { expanded, driver, actualTrip }
}

export default connect(mapStateToProps, { selectDestination, completedTrip, driverOccupied})(DestinationItem);
