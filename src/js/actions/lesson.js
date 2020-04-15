import {
  LESSON_FETCH_DATA, LESSON_SET_DATA,
} from '../constants/lesson';

export const fetchLessons = (classId, onSuccess, onError) => ({
  type: LESSON_FETCH_DATA,
  classId,
  onSuccess,
  onError,
});

export const setLessons = (data) => ({
  type: LESSON_SET_DATA,
  data,
});
