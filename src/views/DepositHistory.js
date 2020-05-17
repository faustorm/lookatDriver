import React, { Component } from 'react';
import { Text,  View, ScrollView, TouchableHighlight, Alert, ListView, Platform, AsyncStorage, PermissionsAndroid } from 'react-native';
import api, {key} from '../api';
import FormInput from '../components/core/FormInput';
import LoadingComponent from '../components/core/Loader';
import DepositList from '../components/Deposit/DepositList';
import common from '../style/common';
import styles from '../style/CreditCard';

class DepositHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      deposits: []
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Historial',
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
    this.fetchDeposits();
  }

  fetchDeposits() {
    this.setState({
      loading: true
    })
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.deposits.history(accessToken)
        .then(response => response.json())
        .then((rjson) => {
          console.log(rjson);
          this.setState({
            deposits: rjson.data
          })
        })
        .catch(() => {
          this.setState({
            loading: false
          })
        })
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <ScrollView style={common.columnContainerReviw}>
          <Text style={styles.productTitle}>Historial de depositos</Text>
          <Text style={styles.productDescription}>Estos depositos son de los viajes que haz realizado y se pagaron con tarjeta de crédito.</Text>
          <DepositList deposits={this.state.deposits} />
        </ScrollView>
      </View>
    );
  }
}

export default DepositHistory;
