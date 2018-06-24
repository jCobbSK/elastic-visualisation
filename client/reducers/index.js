import { PUSH_DATA } from '../constants/action-types';

const initialState = {
  isLoaded: false,
  data: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_DATA:
      return {
        ...state,
        isLoaded: true,
        data: action.data,
      };
    default:
      return state;
  }
};

export default rootReducer;
