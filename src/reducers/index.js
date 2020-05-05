
import { combineReducers } from 'redux';

import user from './user';
import room from './room';
import host from './host';

export default combineReducers({
  user,
  room,
  host,
});
