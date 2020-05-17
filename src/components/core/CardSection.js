import React from 'react';
import { View } from 'react-native';
import styles from '../../style/Cards';

const CardSection = (props) => {
  return(
    <View style={styles.containerStyle} >
      {props.children}
    </View>
  );
};

export { CardSection };
