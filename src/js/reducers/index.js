import { combineReducers } from 'redux';
import dummy from './dummy';
import auth from './auth';
import classes from './classes';

const rootReducer = combineReducers({
  dummy,
  auth,
  classes,
});

export default rootReducer;
