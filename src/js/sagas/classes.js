import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as classesServices from '../services/classes';
import { CLASSES_FETCH_DATA } from '../constants/classes';
import { setClassesData } from '../actions/classes';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchClassesData(action) {
  try {
    const result = yield call(classesServices.fetchClassesData);
    yield put(setClassesData(result.data.data));

    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}


export function* watchFetchClassesData() {
  yield takeLatest(CLASSES_FETCH_DATA, fetchClassesData);
}

export default function* classes() {
  yield fork(watchFetchClassesData);
}
