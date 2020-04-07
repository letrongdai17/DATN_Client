import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as authServices from '../services/auth';
import { setMe } from '../actions/auth';
import { AUTH_SIGN_IN } from '../constants/auth';
import { setToken } from '../helpers/storage';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* signIn(action) {
  try {
    const result = yield call(authServices.signIn, action.user);
    const { token, user } = result.data;
    
    setToken(token);
    yield put(setMe(user));
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* watchSignIn() {
  yield takeLatest(AUTH_SIGN_IN, signIn);
}

export default function* auth() {
  yield fork(watchSignIn);
}
