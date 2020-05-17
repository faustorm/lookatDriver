import React, {Component} from 'react';
import { Text, TouchableWithoutFeedback, View, LayoutAnimation, TouchableOpacity, ListView} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../style/Account';

class SectionHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    return(
      <TouchableWithoutFeedback>
        <View>
          <View style={styles.containerStyle} >
            <View style={styles.spacer}>
              <View style={{flex: 1}}>
                <Text style={{paddingVertical: 10}}>
                  <Text style={styles.titleSection}>{props.title}</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default SectionHeader;
