import {
  LESSON_SET_DATA,
  LESSON_DEFAULT,
} from '../constants/lesson';

const initState = {
  data: []
};

const lesson = (state = initState, action = {}) => {
  switch (action.type) {
    case LESSON_SET_DATA: {
      const result = { ...state };
      console.log(action.data)
      result.data = action.data.data;
      return result;
    }
    case LESSON_DEFAULT:
      return state;
    default:
      return state;
  }
};

export default lesson;
