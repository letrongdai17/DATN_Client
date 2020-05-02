import {
  ROLL_UP,
} from '../constants/student';

export const rollUp = (lessonId, studentCode, onSuccess, onError) => ({
  type: ROLL_UP,
  lessonId,
  studentCode,
  onSuccess,
  onError,
});

export const foo = () => {};
