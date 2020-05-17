import React from 'react';
import { Text, View, TouchableHighlight, AsyncStorage} from 'react-native';
import api, {key} from '../../api';
import styles from '../../style/TripCard';
import common from '../../style/common';

class TripCard extends React.Component {
  constructor(props) {
    super(props);
    this.subscribeTrip = this.subscribeTrip.bind(this);
    this.state = {
      trip: {},
      disabled: props.disabled
    }
  }

  componentWillMount() {
    this.setState({
      trip: this.props.trip,
      disabled: this.props.disabled
    });
  }

  componentWillUpdate(nextProps) {
    if(nextProps.disabled !== this.props.disabled) {
      notOne = !this.props.disabled
      this.setState({
        disabled: notOne
      });
    }
  }

  subscribeTrip() {
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        const accessToken = JSON.parse(checkSession).token;
        api.trip.subscribe({id: this.state.trip.id, token: accessToken})
        .then(response => response.json())
        .then((rjson) => {
          this.props.subscribe(rjson.data);
        })
      } else {
        this.setState({ loading: false, logging: true})
      }
    });

  }

  render() {
    const trip = this.state.trip;
    const distance = trip.distance.toString()
    return (
      <View style={styles.reviewView} >
        <View style={{height: 'auto'}}>
          <View style={styles.card}>
            <View style={{flex: 2}}>
              <Text numberOfLines={1} style={styles.place}>{trip.place} ({trip.branch})</Text>
              <Text numberOfLines={1} style={styles.description}>$35 MXN . Servicio a Domicilio </Text>
            </View>
            <View style={{flex: 1}}>
              <Text numberOfLines={1} style={styles.distance}>{distance.substring(0, 4)} KM</Text>
            </View>
          </View>
          {this.state.disabled ?
            undefined :
            <TouchableHighlight style={common.btnConfirm} onPress={() => this.subscribeTrip()}>
              <View>
                <Text style={common.buttonText}> Realizar Entrega </Text>
              </View>
            </TouchableHighlight>
          }
        </View>
      </View>
    )
  }
}


export default TripCard
