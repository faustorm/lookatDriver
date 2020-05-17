import React, { Component } from 'react';
import { Text,  View, ScrollView, Alert, ListView, Platform, AsyncStorage, PermissionsAndroid } from 'react-native';
import api, {key} from '../api';
import LoadingComponent from '../components/core/Loader';
import CashCard from '../components/Cash/CashCard';
import common from '../style/common';

class TripHistory extends Component {
  constructor(props) {
    super(props);
    const cashDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      cashDataSource: cashDataSource.cloneWithRows([]),
      loading: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Ganancias',
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
    this.fetchCash();
  }

  fetchCash() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.cash.history(accessToken)
        .then(response => response.json())
        .then((rjson) => {
          console.log(rjson.data);
          this.setState ({
            cashDataSource: this.state.cashDataSource.cloneWithRows(rjson.data),
            loading: false,
          });
        })
      } else {
        this.setState({ loading: false })
      }
    });
  }

  renderCash(rowData) {
    return (
      <CashCard cash={rowData} />
    )
  }


  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <ScrollView style={common.columnContainerReviw}>
          <ListView
            horizontal={false}
            dataSource={this.state.cashDataSource} renderRow={this.renderCash.bind(this)}
            enableEmptySections
          />
        </ScrollView>
      </View>
    );
  }
}

export default TripHistory;
