import { combineReducers } from 'redux';
import dummy from './dummy';
import auth from './auth';
import classes from './classes';
import lesson from './lesson';

const rootReducer = combineReducers({
  dummy,
  auth,
  classes,
  lesson,
});

export default rootReducer;
