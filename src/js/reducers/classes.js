import {
  CLASSES_SET_DATA,
  CLASSES_DEFAULT,
} from '../constants/classes';

const initState = {
  data: []
};

const classes = (state = initState, action = {}) => {
  switch (action.type) {
    case CLASSES_SET_DATA: {
      const result = { ...state };
      result.data = action.data;
      return result;
    }
    case CLASSES_DEFAULT:
      return state;
    default:
      return state;
  }
};

export default classes;
