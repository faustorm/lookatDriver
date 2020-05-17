import React from 'react';
import { Text, View, Image, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import FullTripStyles from '../../style/FullTrip';
import { connect } from 'react-redux';
import {actualTrip} from '../../actions';
import styles from '../../style/common';

class FullTrip extends React.Component {
  constructor(props) {
    super(props);
    this.manageClick = this.manageClick.bind(this);
    this.state = {
      trip: props.trip
    }
  }

  manageClick() {
    this.props.actualTrip(this.state.trip);
    this.props.navigator.navigate('Trip')
  }

  renderPlace() {
    if(this.state.trip != null) {
      const trip = this.state.trip;
      return (
        <TouchableHighlight style={styles.innerPadding} underlayColor="transparent" >
          <View>
            <Image style={styles.thumb} source={{ uri: trip.coverPicture }} >
              <View style={styles.overlay} />
            </Image>
            <View style={[styles.infoCard]}>
              <Text numberOfLines={1}>
                <Text style={styles.placeTitle}>{trip.place}</Text>
                <Text style={styles.placeBranch}> - {trip.branch}</Text>
              </Text>
              <Text numberOfLines={2} style={FullTripStyles.placeDescription}>{trip.cash === 1 ? 'Viaje redondo (En efectivo) - ' : 'Un solo viaje, dejar la comida - '} ${trip.profit} MXN</Text>
                <TouchableHighlight style={styles.btnConfirm} onPress={() => this.manageClick()}>
                  <View>
                    <Text style={styles.buttonText}> Ver Detalles </Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>
        </TouchableHighlight>
      )
    }
  }
  render() {
    return (
      <View style={FullTripStyles.main} >
        {this.renderPlace()}
      </View>
    )
  }
}

export default connect(null, {actualTrip})(FullTrip);
