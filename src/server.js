import { Server } from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import React from 'react';
import url from 'url';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import configureStore from './store/configureStore';
import { RouterProvider, actions } from 'react-router5';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import createRouter from './createRouter';
// import Root from './containers/root';

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

    console.info('==> Serving: ' + request.path); // eslint-disable-line no-console

    /**
     * Create Redux store, and get intitial state.
     */
    const router = createRouter();

    // initialize router
    router.start(request.path, (err, state) => {
      const store = configureStore(router, {router: {route: state}});

      // require Root component here, for hot reloading the backend's component
      // TODO: there must be a better approach for this.
      const Root = require('./containers/Root').default;
      const reduxDevTools = process.env.NODE_ENV === 'production' ? null : <DevTools />;
      const providerComponent = (
        <Provider store={store}>
          <RouterProvider router={router}>
            <Root radiumConfig={{userAgent: request.headers['user-agent']}}>
              {reduxDevTools}
            </Root>
          </RouterProvider>
        </Provider>
      );
      store.renderUniversal(ReactDOM.renderToString, providerComponent).then(({ output }) => {
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
              <div id="app">${output}</div>
             <script>
               window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
             </script>
             <script src=/dist/client.js></script>
           </body>
          </html>`
        );
        //  <script src=/dist/client.js></script>

        reply(markup);
        router.stop();
      }).catch(({ output, error }) => {
        // TODO: handle error properly
        console.error(output, error); // eslint-disable-line no-console
        router.stop();
      });
    });
  });
}
