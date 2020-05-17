import React from 'react';
import { View, Text, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../style/common';

class ServiceBar extends React.Component {

  render() {
    const props = this.props;
    return (
      <View style={styles.parent}>
        <Text style={styles.descriptionTitle}>
          {props.text}
        </Text>
        <Switch
          onValueChange={() => props.onChange()}
          style={{marginVertical: 8}}
          value={props.value}
        />
      </View>
    );
  }
}

export default ServiceBar;
