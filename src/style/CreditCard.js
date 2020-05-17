import { Dimensions } from 'react-native';

const styles = {
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
  productDescription: {
    fontSize: 12,
    fontWeight: '200',
    color: '#858585',
    textAlign: 'center',
    marginBottom: 17,
    width: Dimensions.get('window').width / 6 * 4,
    marginLeft: Dimensions.get('window').width / 6 * 1,
  },
}

export default styles
