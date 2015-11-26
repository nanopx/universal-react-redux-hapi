import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import createRouter from '../createRouter';
import Root from '../containers/Root';
import ReduxResolver from '../lib/universalReduxResolver';

/**
 * Fire-up Router5.
 */
const reactRoot = window.document.getElementById('app');
const router = createRouter();
const resolver = new ReduxResolver();
const store = configureStore(router, window.__INITIAL_STATE__);
store.resolver = resolver;

/**
 * Fire-up Router5.
 */
router.start(() => {
  ReactDOM.render(
    <Provider store={store}>
      <RouterProvider router={router}>
        <Root />
      </RouterProvider>
    </Provider>,
    reactRoot
  );
  // clear pending actions
  resolver.clear();
});
