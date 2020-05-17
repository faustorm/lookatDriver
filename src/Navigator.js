import Home from './views/Home';
import Trip from './views/Trip';
import Account from './views/Account';
import TripHistory from './views/TripHistory';
import Revenue from './views/Revenue';
import CreditCard from './views/CreditCard';
import DepositHistory from './views/DepositHistory';
import { StackNavigator } from 'react-navigation';

export default Main = StackNavigator({
  Home: { screen: Home },
  Trip: { screen: Trip },
  Account: { screen: Account },
  TripHistory: { screen: TripHistory },
  Revenue: { screen: Revenue },
  CreditCard: { screen: CreditCard },
  DepositHistory: { screen: DepositHistory },
});
