import { createStore, compose } from 'redux';
import { router5Middleware } from 'redux-router5';
// import { persistState } from 'redux-devtools';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const applyMiddleware = __SERVER__ ?
  require('redux-universal') :
  require('redux').applyMiddleware;

// const logger = (store) => (next) => (action) => {
//   console.group(action.type);  // eslint-disable-line no-console
//   console.info('dispatching', action);  // eslint-disable-line no-console
//   const result = next(action);  // eslint-disable-line callback-return
//   console.log('next state', store.getState());  // eslint-disable-line no-console
//   console.groupEnd(action.type);  // eslint-disable-line no-console
//   return result;
// };

export default function configureStore(router, initialState) {
  // const currentPath = initialState ? initialState.router.route.path : '/';
  const finalCreateStore = compose(
    applyMiddleware(router5Middleware(router)),
    applyMiddleware(reduxPromise),
    // applyMiddleware(logger),
    DevTools.instrument(),
		// persistState(currentPath.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

  return finalCreateStore(rootReducer, initialState);
}
