import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import configureStore from '../store/configureStore';
import { Provider } from 'react-redux';
import DevTools from '../containers/DevTools';
import createRouter from '../createRouter';
import Root from '../containers/Root';
import ReduxResolver from '../lib/universalReduxResolver';

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
        <Root>
          <DevTools />
        </Root>
      </RouterProvider>
    </Provider>,
    reactRoot
  );

  resolver.clear();
});


/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (!reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
  console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line no-console
}
