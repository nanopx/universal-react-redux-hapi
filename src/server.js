import { Server } from "hapi";
import h2o2 from "h2o2";
import inert from "inert";
import React from "react";
import ReactDOM from "react-dom/server";
import configureStore from "./store/configureStore";
import { RouterProvider } from 'react-router5';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools';
import router from "./createRouter";
import url from "url";
import Main from './layouts/Main';

/**
 * Create Redux store, and get intitial state.
 */
const store = configureStore();
const Router = router();
const initialState = store.getState();

/**
 * Start Hapi server on port 8000.
 */
const hostname = process.env.HOSTNAME || "localhost";
const server = new Server();

server.connection({host: hostname, port: process.env.PORT || 8000});

server.register(
	[
		h2o2,
		inert,
		// WebpackPlugin
	],
	(err) => {
	if (err) {
		throw err;
	}

	server.start(() => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
	});
});

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method: "GET",
	path: "/{params*}",
	handler: {
		file: (request) => "static" + request.path
	}
});

/**
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
	method: "GET",
	path: "/api/github/{path*}",
	handler: {
		proxy: {
			passThrough: true,
			mapUri (request, callback) {
				callback(null, url.format({
					protocol: "https",
					host:     "api.github.com",
					pathname: request.params.path,
					query:    request.query
				}));
			},
			onResponse (err, res, request, reply, settings, ttl) {
				reply(res);
			}
		}
	}
});


/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
    return reply.continue();
  }

  Router.start(request.path, (state) => {
  	const reduxDevTools = process.env.NODE_ENV === "production" ? null : <DevTools />;
		const reactString = ReactDOM.renderToString(
			<Provider store={store}>
				<RouterProvider router={Router}>
					<div>
						<Main />
						{reduxDevTools}
					</div>
				</RouterProvider>
			</Provider>
		);

		const webserver = process.env.NODE_ENV === "production" ? "" : "//" + hostname + ":8080";
		let output = (
			`<!doctype html>
			<html lang="ja">
				<head>
					<meta charset="utf-8">
					<title>universal-react-redux-hapi</title>
					<link rel="shortcut icon" href="/favicon.ico">
				</head>
				<body>
					<div id="react-root">${reactString}</div>
 				<script>
 					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
 				</script>
 				<script src=${webserver}/dist/client.js></script>
 			</body>
			</html>`
 		);
  	reply(output);
		Router.stop();
  });
});
