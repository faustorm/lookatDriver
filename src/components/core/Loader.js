'use strict';
import React, { Component } from 'react';
import { Image, Modal, View, Text} from 'react-native';
import common from '../../style/common';

class LoadingComponent extends Component {

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      visible: this.props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible });
  }
  closeModal() {
    this.setState({ visible: false });
  }
  render() {
    return (
      <Modal animationType={'none'} transparent visible={this.state.visible} onRequestClose={() => this.closeModal()}>
        <View style={common.loadingScreen}>
          <Image style={common.loadingImage} source={require('../../img/loveEyes.gif')} />
        </View>
      </Modal>
    );
  }
}


export default LoadingComponent;
