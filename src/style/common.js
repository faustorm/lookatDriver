import {
  Dimensions,
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  // LOADING
  loadingScreen: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingImage: {
    flex: 1,
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  loadingText: {
    color: 'black',
    flex: 1,
  },
  parent: {
    flexDirection: 'row',
    marginRight: 6,
    flex: 1,
    justifyContent: 'space-between'
  },
  descriptionTitle: {
    color: '#313131',
    fontSize: 17,
    lineHeight: 32,
    marginTop: 2
  },
  fieldView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  field: {
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    height: 45,
    paddingHorizontal: 2,
  },
  bodyView: {
    flex: 0,
    marginTop: 0,
    paddingTop: 0,
    backgroundColor: 'white',
    height: Dimensions.get('window').height
  },
  //FullAdvice
  noInternetView: {
    marginHorizontal: 24,
    marginTop: Dimensions.get('window').height / 3,
  },
  noInternetElements: {
    alignItems: 'center',
  },
  noInternetTitle: {
    color: '#656565',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 5
  },
  noInternetText: {
    color: '#656565',
    fontSize: 18,
    textAlign: 'center',
  },
  //Log In
  // LOGIN
  screenHeading: {
    marginTop: 50,
  },
  authModalTitle: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'white',
    textAlign: 'left'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'red'
  },
  loginOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 15
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover'
  },
  loginButton: {
    backgroundColor: '#D1624E',
    padding: 15,
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  loginButtonDisabled: {
    backgroundColor: '#DA8171',
    padding: 15,
    borderRadius: 4,
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  inputFields: {
    marginTop: 12,
    marginBottom: 12,
  },
  marginBottom6: {
    marginBottom: 6,
  },
  extraActions: {
    padding: 12,
    alignItems: 'center',
  },
  action: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
  },
  orSection: {
    paddingTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  orLine: {
    flex: 1,
    height: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    backgroundColor: '#656565',
  },
  close: {
    position: 'absolute',
    top: 10,
    margin: 8,
    elevation: 40,
    right: 8,
    backgroundColor: 'transparent',
  },
  marginBottom6: {
    marginBottom: 6,
  },
  loginField: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 45,
    borderWidth: 1,
    borderColor: '#C63C22',
    borderRadius: 4,
    paddingLeft: 10,
  },
  loginInputText: {
    height: 45,
  },
  extraActions: {
    padding: 12,
    alignItems: 'center',
  },
  action: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  marginTop10: {
    marginTop: 10,
  },
  btnConfirm: {
    backgroundColor: '#56d88d',
    padding: 15,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 10
  },
  btnActivate: {
    backgroundColor: '#56d88d',
    paddingVertical: 35,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    alignSelf: 'center',
  },
  columnContainerReviw: {
    flex: 0,
    backgroundColor: '#fff'
  },
  innerPadding: {
    flex: 1,
    padding: 6,
  },
  thumb: {
    height: 100,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.2,
  },
  infoOverlay: {
    flex: 1,
    paddingHorizontal: 6,
    paddingBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCard: {
    padding: 12,
    elevation: 3,
    height: 'auto',
    marginBottom: 10
  },
  placeTitle: {
    marginTop: 2,
    marginBottom: 2,
    fontSize: 16,
    fontWeight: '900',
    color: '#303030',
  },
  placeBranch: {
    fontSize: 13,
    color: '#323232',
  },
  text: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    margin: 2,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  },
  productTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#343434',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 15,
    width: Dimensions.get('window').width / 6 * 4,
    marginLeft: Dimensions.get('window').width / 6 * 1,
  },
});
