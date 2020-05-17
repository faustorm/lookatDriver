import React from 'react';
import { Text, View, Image, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import FullTripStyles from '../../style/FullTrip';
import styles from '../../style/common';

class HistoryCard extends React.Component {

  render() {
    const place = this.props.trip.Place;
    const trip = this.props.trip
    return (
      <View style={FullTripStyles.main} >
        <TouchableHighlight style={styles.innerPadding} underlayColor="transparent" >
          <View>
            <Image style={styles.thumb} source={{ uri: place.coverPicture }} >
              <View style={styles.overlay} />
            </Image>
            <View style={[styles.infoCard]}>
              <Text numberOfLines={1}>
                <Text style={styles.placeTitle}>{place.place}</Text>
                <Text style={styles.placeBranch}> - {place.branch} </Text>
              </Text>
              <Text numberOfLines={2} style={FullTripStyles.placeDescription}>{trip.cash === 1 ? 'Viaje en efectivo - ' : 'Pago con tarjeta - '} $35 MXN - Viaje No. #{trip.id}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}


export default HistoryCard
