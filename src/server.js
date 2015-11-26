import { Server } from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import React from 'react';
import url from 'url';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import configureStore from './store/configureStore';
import { RouterProvider } from 'react-router5';
import { Provider } from 'react-redux';
import createRouter from './createRouter';
import ReduxResolver from './lib/universalReduxResolver';

export default function initialize(cb) {
  /**
   * Start Hapi server on port 3000.
   */
  const hostname = process.env.HOSTNAME || 'localhost';
  const server = new Server();

  server.connection({host: hostname, port: process.env.PORT || 3000});

  server.register(
    [
      h2o2,
      inert,
    ],
    (err) => {
      if (err) {
        throw err;
      }
      cb(server);
    }
  );

  /**
   * Attempt to serve static requests from the public folder.
   */
  server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
      file: (request) => 'static' + request.path,
    },
  });

  /**
   * Endpoint that proxies all GitHub API requests to https://api.github.com.
   */
  server.route({
    method: 'GET',
    path: '/api/github/{path*}',
    handler: {
      proxy: {
        passThrough: true,
        mapUri(request, callback) {
          callback(null, url.format({
            protocol: 'https',
            host: 'api.github.com',
            pathname: request.params.path,
            query: request.query,
          }));
        },
        onResponse(err, res, request, reply/** , settings, ttl **/) {
          reply(res);
        },
      },
    },
  });


  /**
   * Catch requests and serve using Router5
   */
  server.ext('onPreResponse', (request, reply) => {
    if (typeof request.response.statusCode !== 'undefined') {
      return reply.continue();
    }

    /**
     * Create Redux store, and get intitial state.
     */
    const router = createRouter();
    const resolver = new ReduxResolver();
    const store = configureStore(router);
    store.resolver = resolver;

    // initialize router
    router.start(request.path, async (err, state) => { // eslint-disable-line no-unused-vars

      // require Root component here, for hot reloading the backend's component
      // TODO: there must be a better approach for this.
      const Root = require('./Root').default;

      const initialComponents = (
        <Provider store={store}>
          <RouterProvider router={router}>
            {/** pass down state here, so that the Root component can figure out which page to render */}
            <Root state={state} radiumConfig={{userAgent: request.headers['user-agent']}} />
          </RouterProvider>
        </Provider>
      );

      // initial render, but do nothing with it
      ReactDOM.renderToString(initialComponents);

      // Fire all the promises for data-fetching etc.
      await resolver.dispatchAll();

      const content = ReactDOM.renderToString(initialComponents);
      const initialState = store.getState();
      const head = Helmet.rewind();

      const markup = (
        `<!doctype html>
        <html lang="ja">
          <head>
            ${head.title.toString()}
            ${head.meta.toString()}
            ${head.link.toString()}
          </head>
          <body>
            <div id="app">${content}</div>
           <script>
             window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
           </script>
           <script src=/dist/client.js></script>
         </body>
        </html>`
      );

      console.info('==> Replying: ' + request.path); // eslint-disable-line no-console
      reply(markup);
      router.stop();
    });
  });
}
