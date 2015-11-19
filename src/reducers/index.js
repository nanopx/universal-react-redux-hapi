import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';

const rootReducer = combineReducers({
  router: router5Reducer,
});

export default rootReducer;
