import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  reviewView: {
    margin: 10,
    height: 'auto',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.8,
    padding: 6
  },
  card: {
    flex: 1,
    height: 'auto',
    padding: 3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  place: {
    color: '#666666',
    fontSize: 15,
    fontWeight: '900'
  },
  description: {
    color: '#b2b2b2',
    fontSize: 12,
    fontWeight: '300'
  },
  distance: {
    color: '#191919',
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'right'
  }
});
export default styles;
