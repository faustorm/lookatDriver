import React, { Component } from 'react';
import { Text,  View, ScrollView, Alert, ListView, Platform, AsyncStorage, PermissionsAndroid } from 'react-native';
import api, {key} from '../api';
import LoadingComponent from '../components/core/Loader';
import HistoryCard from '../components/trips/HistoryCard';
import common from '../style/common';

class TripHistory extends Component {
  constructor(props) {
    super(props);
    const tripsDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      tripsDataSource: tripsDataSource.cloneWithRows([]),
      loading: false,
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
    this.fetchHistory();
  }

  fetchHistory() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.trip.history(accessToken)
        .then(response => response.json())
        .then((rjson) => {
          this.setState ({
            tripsDataSource: this.state.tripsDataSource.cloneWithRows(rjson.data),
            loading: false,
          });
        })
      } else {
        this.setState({ loading: false })
      }
    });
  }

  renderTrip(rowData) {
    return (
      <HistoryCard trip={rowData} />
    )
  }


  render() {
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <ScrollView style={common.columnContainerReviw}>
          <ListView
            horizontal={false}
            dataSource={this.state.tripsDataSource} renderRow={this.renderTrip.bind(this)}
            enableEmptySections
          />
        </ScrollView>
      </View>
    );
  }
}

export default TripHistory;
