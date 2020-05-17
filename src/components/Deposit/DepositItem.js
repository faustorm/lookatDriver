import React from 'react';
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native';
import moment from 'moment/min/moment-with-locales'
import api, {key} from '../../api';
import styles from '../../style/TripCard';
import common from '../../style/common';

class TripCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: {}
    }
  }

  componentWillMount() {
    this.setState({
      deposit: this.props.deposit
    });
  }

  render() {
    const deposit = this.state.deposit;
    moment.locale('es');
    const dateCreated = moment(deposit.createdAt).format("MMMM D");
    return (
      <View style={styles.reviewView} >
        <View style={{height: 'auto'}}>
          <View style={styles.card}>
            <View style={{flex: 2}}>
              <Text numberOfLines={1} style={styles.place}>{dateCreated}</Text>
              <Text numberOfLines={1} style={styles.description}>No. #{deposit.id}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={styles.distance}>${deposit.amount} MXN</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}


export default TripCard
