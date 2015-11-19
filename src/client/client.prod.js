import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from 'react-router5';
import configureStore from "../store/configureStore";
import { Provider } from 'react-redux';
import createRouter from "../createRouter";
const store = configureStore(window.__INITIAL_STATE__);

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById("react-root");

ReactDOM.render(
	<Provider store={store}>
      <RouterProvider router={createRouter()}>
				<div>aaa</div>
			</RouterProvider>
  </Provider>,
  reactRoot
)
