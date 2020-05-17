import React, { Component } from 'react';
import { Text,  View, ScrollView, ListView, Alert, TouchableOpacity, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Communications from 'react-native-communications';
import common from '../style/common';
import api, {key} from '../api';
import Login from '../components/users/Login';
import LoadingComponent from '../components/core/Loader';
import SectionHeader from '../components/Account/SectionHeader';
import SectionOption from '../components/Account/SectionOption';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  static navigationOptions = {
    title: 'Cuenta',
    headerBackTitleStyle: {
      color: '#e5e5e5'
    },
    headerTintColor: '#e5e5e5',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20
   },
   headerStyle: {
      backgroundColor: '#C63C22'
   }
  }

  instantCall() {
    Alert.alert('¿Necesitas ayuda?','Alguien siempre esta para ayudarte en lookat, si necesitas ayuda urgente no dudes en hacernos una llamada, de otra forma contestaremos un correo electrónico en unos minutos.',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Enviar Correo', onPress: () => Communications.email(['contacto@lookatmobile.com'], null, null, 'Necesito ayuda', 'Hola, he tenido un problema: ')},
      ],
      { cancelable: false }
    )
  }

  logout() {
    Alert.alert('Alerta', '¿Seguro que quieres cerrar sesión?', [
      { text: 'Si',
        onPress: () => AsyncStorage.removeItem(key, () => {
          this.setState({ loggedIn: false });
          AsyncStorage.setItem('loggedOut', '1');
          this.props.navigation.navigate('Home');
        }),
      },
      { text: 'No' }]);
  }

  unactivateDriver() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.driver.activeDriver(accessToken, 0)
        .then(response => response.json())
        .then((rjson) => {
          Alert.alert('Listo','Cuando quieras volver a recibir pedidos, solo oprime "Recibir Pedidos" en la pantalla principal',
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
          this.driverEntered(accessToken);
          this.props.navigation.navigate('Home');
        })
      }
    });
  }

  driverEntered(accessToken) {
    api.driver.profile(accessToken)
    .then(response => response.json())
    .then((rjson) => {
      if(rjson.data !== null) {
        this.props.driverEntered(rjson.data);
      }
    })
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <LoadingComponent visible={this.state.loading} />
        <ScrollView style={common.columnContainerReviw}>
          <SectionHeader title="Viajes" />
          {this.props.driver.active === 1 ? <SectionOption icon="power-settings-new" title="Dejar de recibir pedidos" clicker={() => this.unactivateDriver()}/> : undefined}
          <SectionOption icon="monetization-on" title="Ganancias" clicker={() => this.props.navigation.navigate('Revenue')}/>
          <SectionOption icon="history" title="Historial de pedidos" clicker={() => this.props.navigation.navigate('TripHistory')} />
          <SectionOption icon="credit-card" title="Tarjeta de depositos" clicker={() => this.props.navigation.navigate('CreditCard')} />
          <SectionOption icon="account-balance" title="Historial de Depositos" clicker={() => this.props.navigation.navigate('DepositHistory')} />
          <SectionOption icon="warning" title="Ayuda instantanea" clicker={() => this.instantCall()} />
        </ScrollView>
        <TouchableOpacity style={{backgroundColor: '#F73D28',padding: 15,justifyContent: 'center',alignSelf: 'stretch',margin: 6}} onPress={() => this.logout()}>
          <View>
            <Text style={common.buttonText}>
                <Text style={common.buttonContent}> Cerrar Sesión </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = ({user, driver}) => {
  return {user, driver}
}

export default connect(mapStateToProps, actions)(Account);
