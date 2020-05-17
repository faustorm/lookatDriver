import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../style/common';

const HelperButton = ({onClick, children}) => {
  console.log(onClick)
  const { button, text } = styles
  return (
    <TouchableOpacity onPress={onClick} style={button}>
      <Text style={text} >{children}</Text>
    </TouchableOpacity>
  );
};

export {HelperButton};
