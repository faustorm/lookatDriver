import React from 'react';
import { Text, View, Image, StyleSheet, Alert, TouchableHighlight} from 'react-native';
import CashStyles from '../../style/Cash';
import styles from '../../style/common';

class HistoryCard extends React.Component {

  render() {
    const cash = this.props.cash;
    return (
      <View style={CashStyles.main} >
        <TouchableHighlight style={styles.innerPadding} underlayColor="transparent" >
          <View>
            <Image style={styles.thumb} source={{ uri: cash.coverPicture }} >
              <View style={styles.overlay} />
            </Image>
            <View style={[styles.infoCard]}>
              <Text numberOfLines={1}>
                <Text style={styles.placeTitle}>Viaje No. #{cash.id}</Text>
                <Text style={styles.placeBranch}> - {cash.place} </Text>
              </Text>
              {cash.cash === 1 ?
                <Text numberOfLines={2} style={CashStyles.cashDescription}>
                  Viaje en efectivo (Tu cuentas con el dinero) - $35 MXN
                </Text>
                :
                undefined
              }
              {cash.cash === 0 && cash.solved === 1 ?
                <Text numberOfLines={2} style={CashStyles.cashDescription}>
                  Ya hemos depositado a tu cuenta - $50 MXN
                </Text>
                :
                undefined
              }
              {cash.cash === 0 && cash.solved === 0 ?
                <Text numberOfLines={2} style={CashStyles.notYet}>
                  Pendientes de depositar a tu cuenta - $50 MXN
                </Text>
                :
                undefined
              }
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}


export default HistoryCard
