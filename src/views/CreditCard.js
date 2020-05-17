import React, { Component } from 'react';
import { Text,  View, ScrollView, TouchableHighlight, Alert, ListView, Platform, AsyncStorage, PermissionsAndroid } from 'react-native';
import api, {key} from '../api';
import FormInput from '../components/core/FormInput';
import LoadingComponent from '../components/core/Loader';
import common from '../style/common';
import styles from '../style/CreditCard';

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      logging: false,
      already: false,
      card: {
        holderName: '',
        bankName: '',
        clabeNumber: '',
        cardNumber: ''
      }
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Tarjeta',
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
  });

  componentWillMount() {
    this.fetchBankAccount();
  }

  fetchBankAccount() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.driver.card(accessToken)
        .then(response => response.json())
        .then((rjson) => {
          if(rjson.data.holderName) {
            console.log(rjson.data);
            this.setState({
              card: rjson.data,
              already: true
            })
          }
        })
        .catch(() => {
          this.setState({
            already: false
          })
        })
      }
    });
  }

  submitCard() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        if(this.state.already === false) {
          console.log('post')
          api.driver.postCard(accessToken, this.state.card)
          .then(response => response.json())
          .then((rjson) => {
            Alert.alert('Listo', 'Haz Agregado tu tarjeta exitosamente.', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
          })
          .catch(() => {
            Alert.alert('Error', 'No hemos podido, si el problema persiste ponte en contacto con nosotros', [{ text: 'OK'}]);
          })
        } else {
          console.log('put')
          api.driver.putCard(accessToken, this.state.card)
          .then(response => response.json())
          .then((rjson) => {
            Alert.alert('Listo', 'Haz editado tu tarjeta exitosamente', [{ text: 'OK', onPress: () => this.props.navigation.goBack() }]);
          })
          .catch(() => {
            Alert.alert('Error', 'No hemos podido, si el problema persiste ponte en contacto con nosotros', [{ text: 'OK'}]);
          })
        }
      }
    });
  }

  render() {
    const card = this.state.card
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <ScrollView style={common.columnContainerReviw}>
          <Text style={styles.productTitle}>Tarjeta de Crédito</Text>
          <Text style={styles.productDescription}>Esta es la cuenta a la que depositaremos los viajes que se realizen con tarjeta.</Text>
          <FormInput title="Nombre:" length={100} placeholder="Alfonso de los Rios" value={card.holderName} onChange={(text) => this.setState({card: {...card, holderName: text}})}/>
          <FormInput title="Banco:" length={18} placeholder="Scotiabank" value={card.bankName} onChange={(text) => this.setState({card: {...card, bankName: text}})}/>
          <FormInput title="Número de Tarjeta:" length={16} placeholder="48XXXXXXXXXXXX98" value={card.cardNumber} onChange={(text) => this.setState({card: {...card, cardNumber: text}})}/>
          <FormInput title="Clave Interbancaria:" length={18} placeholder="XXXXXXXXXXXXXXXXXX" value={card.clabeNumber} onChange={(text) => this.setState({card: {...card, clabeNumber: text}})}/>
          <TouchableHighlight style={[common.btnConfirm, {margin: 5}]} onPress={() => this.submitCard()}>
            <View>
              <Text style={common.buttonText}> Guardar Cambios </Text>
            </View>
          </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
}

export default CreditCard;
