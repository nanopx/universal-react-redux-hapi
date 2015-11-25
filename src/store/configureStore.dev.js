import { createStore, compose } from 'redux';
import { router5Middleware } from 'redux-router5';
// import { persistState } from 'redux-devtools';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

const applyMiddleware = __SERVER__ ?
  require('redux-universal') :
  require('redux').applyMiddleware;

export default function configureStore(router, initialState) {
  // const currentPath = initialState ? initialState.router.route.path : '/';
  const finalCreateStore = compose(
    applyMiddleware(router5Middleware(router)),
    applyMiddleware(reduxPromise),
    DevTools.instrument(),
		// persistState(currentPath.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);

  const store = finalCreateStore(rootReducer, initialState);
  console.log(store.getState(), initialState, 'initial state from configureStore');

  // if (module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     store.replaceReducer(require('../reducers'))
  //   );
  // }

  return store;
}
