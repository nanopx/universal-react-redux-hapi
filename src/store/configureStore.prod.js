import { createStore, applyMiddleware, compose } from 'redux';
import { router5Middleware } from 'redux-router5';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';

const router = createRouter();
const finalCreateStore = compose(
  applyMiddleware(router5Middleware(router)),
  applyMiddleware(reduxPromise)
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
