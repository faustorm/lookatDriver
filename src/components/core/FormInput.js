import React, { Component } from 'react';
import { Text, View, TextInput} from 'react-native';

class FormInput extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={{margin: 5}}>
        <Text style={{marginTop: 12,fontSize: 16,fontWeight: '500',color: '#343434',marginBottom: 4}}>{this.props.title}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingLeft: 10}}
          onChangeText={(text) => this.props.onChange(text)}
          placeholder={this.props.placeholder}
          value={this.props.value}
          maxLength={this.props.length || 50}
          underlineColorAndroid={'transparent'}
        />
      </View>
    );
  }
}


export default FormInput;
