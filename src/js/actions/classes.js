import {
  CLASSES_FETCH_DATA,
  CLASSES_SET_DATA,
} from '../constants/classes';

export const fetchClassesData = (onSuccess, onError) => ({
  type: CLASSES_FETCH_DATA,
  onSuccess,
  onError,
});

export const setClassesData = (data) => ({
  type: CLASSES_SET_DATA,
  data,
})
