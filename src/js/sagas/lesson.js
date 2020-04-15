import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as lessonServices from '../services/lesson';
import { LESSON_FETCH_DATA, LESSON_CREATE } from '../constants/lesson';
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

export function* createLesson(action) {
  try {
    const payloads = {
      class_id: action.classId,
      start_time: action.startTime,
      end_time: action.endTime,
    };

    yield call(lessonServices.createLesson, payloads);
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* watchFetchLessons() {
  yield takeLatest(LESSON_FETCH_DATA, fetchLessons);
}

export function* watchCreateLesson() {
  yield takeLatest(LESSON_CREATE, createLesson);
}

export default function* lesson() {
  yield fork(watchFetchLessons);
  yield fork(watchCreateLesson);
}
