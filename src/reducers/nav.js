
import { NavigationActions, StackActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

const initialState = AppNavigator.router.getStateForAction(StackActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({
      routeName: 'Authentication',
    }),
  ],
}));

export default function(state = initialState, action) {
  console.log(initialState);
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};
