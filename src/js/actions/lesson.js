import {
  LESSON_FETCH_DATA,
  LESSON_SET_DATA,
  LESSON_CREATE,
  FETCH_LESSON_STUDENTS_ROLLED_UP,
  SET_LESSON_STUDENTS_ROLLED_UP,
  FETCH_CLASS_BY_LESSON_ID,
  SET_CLASS,
} from '../constants/lesson';

export const fetchLessons = (classId, currentPage, perPage, onSuccess, onError) => ({
  type: LESSON_FETCH_DATA,
  classId,
  currentPage,
  perPage,
  onSuccess,
  onError,
});

export const setLessons = (data) => ({
  type: LESSON_SET_DATA,
  data,
});

export const createLesson = (classId, startTime, endTime, onSuccess, onError) => ({
  type: LESSON_CREATE,
  classId,
  startTime,
  endTime,
  onSuccess,
  onError,
});

export const fetchLessonStudentsRolledUp = (lessonId, onSuccess, onError) => ({
  type: FETCH_LESSON_STUDENTS_ROLLED_UP,
  lessonId,
  onSuccess,
  onError,
});

export const setLessonStudentsRolledUp = (data) => ({
  type: SET_LESSON_STUDENTS_ROLLED_UP,
  data,
});

export const fetchClassByLessonId = (lessonId, onSuccess, onError) => ({
  type: FETCH_CLASS_BY_LESSON_ID,
  lessonId,
  onSuccess,
  onError,
});

export const setClass = (data) => ({
  type: SET_CLASS,
  data,
});
