import { createStore, applyMiddleware, compose } from 'redux';
import { router5Middleware } from 'redux-router5';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const finalCreateStore = compose(
  applyMiddleware(router5Middleware),
  applyMiddleware(reduxPromise)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
