import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as lessonServices from '../services/lesson';
import { LESSON_FETCH_DATA } from '../constants/lesson';
import { setLessons } from '../actions/lesson';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchLessons(action) {
  try {
    const result = yield call(lessonServices.fetchLessons, action.classId);
    yield put(setLessons(result.data.data));

    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}


export function* watchFetchLessons() {
  yield takeLatest(LESSON_FETCH_DATA, fetchLessons);
}

export default function* lesson() {
  yield fork(watchFetchLessons);
}
