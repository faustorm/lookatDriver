import React from 'react';
import { Alert, AsyncStorage, Dimensions, Platform, Image, Modal, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import Pushwoosh from 'pushwoosh-react-native-plugin';
import api, {key} from '../../api';
import Loader from '../core/Loader';
import common from '../../style/common';
import { userEntered } from '../../actions/index.js';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Iniciar Sesión',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: 'white',
      fontSize: 20
   },
   headerStyle: {
      backgroundColor: '#C63C22'
   }
  }

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
    this.state = {
      data: {
        email: undefined,
        password: undefined
      },
      loading: false,
      session: undefined,
      messages: [],
      visible: this.props.visible
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.visible !== this.state.visible) {
      this.setState({
        visible : nextProps.visible
      })
    }
  }

  onClose() {
    this.setState({ visible: false });
    this.props.closeAction();
  }

  onForgot() {
    if (this.props.returnTo === 'reviews') {
      this.props.navigation.navigate('Reviews', { returnTo: this.props.returnTo});
    } else {
      this.props.navigation.goBack();
    }
  }

  onRegister() {
    if (this.props.returnTo === 'reviews') {
      this.props.navigation.navigate('Reviews', { returnTo: this.props.returnTo});
    } else {
      this.props.navigation.goBack();
    }
  }

  focusNextField(nextField) {
    this.refs[nextField].focus();
  }

  //*
  //Pushwoosh
  //*
  registerPushToken(loginToken) {
    Pushwoosh.init({
      'pw_appid': '20AD1-421B1',
      'project_number': '743756328639',
    });
    AsyncStorage.getItem('pushToken').then((pushSession) => {
      if (pushSession) {
        const data = {
          token: loginToken,
          user: {
            pushToken: pushSession,
            device: Platform.OS === 'ios' ? 2 : 1,
            version: '2.0.0'
          },
        };
        console.log(data);
        api.user.updateUserDeviceInfo(data)
        .then(response => response.json())
        .then((rjson) => {
        })
      }
    });
  }

  onSubmit() {
    const data = {
      email: this.state.data.email,
      password: this.state.data.password,
    };
    if (data.email && data.password) {
      this.setState({ loading: true });
      api.auth.login(data)
      .then(response => response.json())
      .then((rjson) => {
        this.registerPushToken(rjson.data.token);
        this.props.userEntered(rjson.data);
        if (rjson.status !== 'success') {
          console.log(rjson)
          Alert.alert('No Hemos Podido', 'Asegurate de que tu correo electrónico y contraseña son correctos.', [{ text: 'OK', onPress: () => this.setState({ loading: false }) }]);
        } else {
          this.onSuccess(JSON.stringify(rjson.data)).done(() => {
            Alert.alert(
              'Listo!',
              'Has iniciado sesión correctamente.',
              [{ text: 'OK', onPress: () => { this.setState({ loading: false }); this.onClose();},},],
            );
          });
        }
      })
      .catch((rjson) => {
        console.log(rjson)
        Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK',
          onPress: () => this.setState({ loading: false }),
        }]);
      })
      .done();
    } else {
      Alert.alert('Error', 'Favor de completar todos los datos.', [{ text: 'OK' }]);
      this.setState({ loading: false });
    }
  }

  async onSuccess(data) {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      this.appendMessage('AsyncStorage error: ' + error.message);
    }
  }

  appendMessage = (message) => {
    this.setState({ messages: this.state.messages.concat(message) });
  };

  render() {
    const fields = [
      { ref: 'email', placeholder: 'Correo electrónico', keyboardType: 'email-address', secureTextEntry: false, autoCorrect: false, style: [common.loginInputText], underlineColorAndroid: '#C63C22' },
      { ref: 'password', placeholder: 'Contraseña', keyboardType: 'default', secureTextEntry: true, style: [common.loginInputText], underlineColorAndroid: '#C63C22' },
    ];
    return (
      <Modal animationType={'slide'} transparent={false} onRequestClose={() => this.onClose()} visible={this.state.visible} >
        <ScrollView style={{flex: 1, backgroundColor: '#fff', elevation: 10000000}}>
          <View style={common.bodyView}>
            <View>
              <Image style={common.backgroundImage} source={require('../../img/authBackground.png')} />
            </View>
            <View style={common.loginOverlay}>
              <View style={styles.loginHeading}>
                <Text style={common.authModalTitle}>{'Iniciar sesión'}</Text>
              </View>
              <View style={styles.loginCard}>
                <View key={'email'} style={common.inputFields}>
                  <View style={[common.loginField, common.marginBottom6]}>
                    <TextInput
                      placeholderTextColor="white"
                      {...fields[0]}
                      onChangeText={text => this.setState({ data: { ...this.state.data, email: text } })}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      returnKeyType={'next'}
                      onSubmitEditing={() => this.focusNextField('password')}
                    />
                  </View>
                  <View key={'password'} style={[common.loginField, common.marginBottom6]}>
                    <TextInput
                      placeholderTextColor="white"
                      {...fields[1]}
                      onChangeText={text => this.setState({ data: { ...this.state.data, password: text } })}
                      returnKeyType={'done'}
                    />
                  </View>
                </View>
                <TouchableHighlight underlayColor={'#ffffff'} style={this.state.loading ? common.loginButtonDisabled : common.loginButton} onPress={() => this.onSubmit()}>
                  <View>
                    <Text style={common.buttonText}>{this.state.loading ? 'Espera un momento . . .' : 'Entrar'}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
        </View>
        <Loader visible={this.state.loading} />
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  loginCard: {
    width: Dimensions.get('window').width - 35,
    padding: 12,
    borderRadius: 4,
  },
  loginHeading: {
    marginTop:  Dimensions.get('window').height / 5,
    paddingLeft: 15,
  },
});

const mapStateToProps = ({user}) => {
  return {user}
}

export default connect(mapStateToProps, { userEntered })(Login);
