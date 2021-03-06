import { PUSH_DATA, SEARCH } from '../constants/action-types.js';

export const pushDataToStore = (data) => ({
  type: PUSH_DATA,
  data,
});

export const triggerSearchAction = (searchTerm) => ({
  type: SEARCH,
  data: {
    searchTerm,
  },
});

export const loadData = () => (dispatch) =>
    fetch('https://7ns723fhfg.execute-api.us-east-1.amazonaws.com/dev/api', {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then(response => response.json())
    .then(results => dispatch(pushDataToStore(results)));
