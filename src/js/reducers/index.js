import { combineReducers } from 'redux';
import dummy from './dummy';
import auth from './auth';

const rootReducer = combineReducers({
  dummy,
  auth,
});

export default rootReducer;
