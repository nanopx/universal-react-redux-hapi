import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from 'react-router5';
import configureStore from "../store/configureStore";
import { Provider } from 'react-redux';
import createRouter from "../createRouter";
import Root from '../containers/Root';

/**
 * Fire-up Router5.
 */
const reactRoot = window.document.getElementById("app");
const router = createRouter();
const store = configureStore(router, window.__INITIAL_STATE__);

router.start(() => {
	ReactDOM.render(
		<Provider store={store}>
			<RouterProvider router={router}>
				<Root />
			</RouterProvider>
		</Provider>,
		reactRoot
	);
});
