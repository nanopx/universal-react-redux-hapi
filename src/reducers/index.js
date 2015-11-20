import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import counter from './counter';

const rootReducer = combineReducers({
  router: router5Reducer,
  counter,
});

export default rootReducer;
