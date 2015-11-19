import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import stargazers from './stargazers';

const rootReducer = combineReducers({
  router: router5Reducer,
  stargazers
});

export default rootReducer;
