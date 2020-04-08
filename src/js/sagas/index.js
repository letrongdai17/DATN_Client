import { fork } from 'redux-saga/effects';
import dummy from './dummy';
import auth from './auth';

export default function* root() {
  yield fork(dummy);
  yield fork(auth);
}
