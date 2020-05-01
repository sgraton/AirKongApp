
import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';

import reducer from './reducers';

export default function configureStore(onCompletion) {
  const enhancer = compose(
    applyMiddleware(createReactNavigationReduxMiddleware(
      state => state.nav,
    )),
    applyMiddleware(thunk),
  );

  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  }

  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStore(persistedReducer, enhancer);
  persistStore(store, onCompletion());
  return store;
}
