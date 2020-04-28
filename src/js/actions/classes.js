import {
  CLASSES_FETCH_DATA,
  CLASSES_SET_DATA,
  FETCH_CLASS_STUDENTS_ROLLED_UP,
  SET_CLASS_STUDENTS_ROLLED_UP,
} from '../constants/classes';

export const fetchClassesData = (currentPage, perPage, onSuccess, onError) => ({
  type: CLASSES_FETCH_DATA,
  currentPage,
  perPage,
  onSuccess,
  onError,
});

export const setClassesData = (data) => ({
  type: CLASSES_SET_DATA,
  data,
});

export const fetchClassStudentsRolledUp = (classId, onSuccess, onError) => ({
  type: FETCH_CLASS_STUDENTS_ROLLED_UP,
  classId,
  onSuccess,
  onError,
});

export const setClassStudentsRolledUp = (data) => ({
  type: SET_CLASS_STUDENTS_ROLLED_UP,
  data,
});
