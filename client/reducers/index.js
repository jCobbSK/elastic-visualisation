import { PUSH_DATA, SEARCH } from '../constants/action-types';
import searchReducer from './searchReducer';

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
    case SEARCH:
      return {
        ...state,
        data: searchReducer(state.data, action.data.searchTerm),
      };
    default:
      return state;
  }
};

export default rootReducer;
