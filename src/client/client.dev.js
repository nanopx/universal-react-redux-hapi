import React from "react";
import ReactDOM from "react-dom";
import { RouterProvider } from 'react-router5';
import configureStore from "../store/configureStore";
import { Provider } from 'react-redux';
import DevTools from "../containers/DevTools";
import createRouter from "../createRouter";
import Main from '../layouts/Main';
const store = configureStore(window.__INITIAL_STATE__);

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById("react-root");
const router = createRouter();

router.start((err, state) => {
	ReactDOM.render(
		<Provider store={store}>
			<RouterProvider router={router}>
				<Main>
					<DevTools />
				</Main>
			</RouterProvider>
		</Provider>,
		reactRoot
	);
});


/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (!reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes["data-react-checksum"]) {
	console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
}
