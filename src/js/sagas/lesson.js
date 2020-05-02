import {
  takeLatest,
  call,
  put,
  fork,
} from 'redux-saga/effects';
import * as lessonServices from '../services/lesson';
import {
  LESSON_FETCH_DATA, LESSON_CREATE,
  FETCH_CLASS_BY_LESSON_ID, FETCH_LESSON_STUDENTS_ROLLED_UP
} from '../constants/lesson';
import { setLessons, setLessonStudentsRolledUp, setClass } from '../actions/lesson';

/**
 * @export
 * @param { type: String, onSuccess: func, onError: func} action
 */
export function* fetchLessons(action) {
  try {
    const { currentPage, perPage, classId } = action;
    const result = yield call(lessonServices.fetchLessons, classId, currentPage, perPage);
    yield put(setLessons(result.data));

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

export function* fetchLessonStudentsRolledUp(action) {
  try {
    const result = yield call(lessonServices.fetchLessonStudentsRolledUp, action.lessonId);
    yield put(setLessonStudentsRolledUp(result.data));
    action.onSuccess();
  } catch (err) {
    action.onError(err);
  }
}

export function* fetchClassByLessonId(action) {
  try {
    const result = yield call(lessonServices.fetchClassByLessonId, action.lessonId);
    yield put(setClass(result.data.data));

    action.onSuccess();
  } catch (error) {
    action.onError(error);
  }
}

export function* watchFetchLessons() {
  yield takeLatest(LESSON_FETCH_DATA, fetchLessons);
}

export function* watchCreateLesson() {
  yield takeLatest(LESSON_CREATE, createLesson);
}

export function* watchFetchLessonStudentsRolledUp() {
  yield takeLatest(FETCH_LESSON_STUDENTS_ROLLED_UP, fetchLessonStudentsRolledUp);
}

export function* watchFetchClassByLessonId() {
  yield takeLatest(FETCH_CLASS_BY_LESSON_ID, fetchClassByLessonId);
}

export default function* lesson() {
  yield fork(watchFetchLessons);
  yield fork(watchCreateLesson);
  yield fork(watchFetchLessonStudentsRolledUp);
  yield fork(watchFetchClassByLessonId);
}
