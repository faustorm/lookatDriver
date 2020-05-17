import React, {Component} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../style/Account';

class SectionOption extends Component  {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return(
        <TouchableOpacity underlayColor="#dddddd" onPress={() => props.clicker()}>
          <View style={styles.sectionItem} >
            <View style={{flex: 1, flexDirection: 'row', paddingLeft: 10}}>
              <View style={{flexDirection: 'column', flex: 2}}>
                <Text>
                  <Icon size={20} color="#727272" name={props.icon} />
                </Text>
              </View>
              <Text  style={{flexDirection: 'column', flex: 8}}>
                <Text style={styles.productTitle}>
                  {props.title}
                </Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
    );
  }
};

export default SectionOption ;
