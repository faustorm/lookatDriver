import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import common from '../../style/common';

const ConfirmButton = ({onClick, children}) => {
  return (
    <TouchableOpacity style={common.btnActivate} onPress={onClick}>
      <View>
        <Text style={common.buttonText}> {children} </Text>
      </View>
    </TouchableOpacity>
  );
};

export {ConfirmButton};
