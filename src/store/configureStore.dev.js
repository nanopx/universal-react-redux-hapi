import { createStore, applyMiddleware, compose } from 'redux';
import { router5Middleware } from 'redux-router5';
// import { persistState } from 'redux-devtools';
import reduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createRouter from '../createRouter';

const router = createRouter();
const finalCreateStore = compose(
	applyMiddleware(router5Middleware(router)),
	applyMiddleware(reduxPromise),
	DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
	const store = finalCreateStore(rootReducer, initialState);
	router.start();

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers'))
		);
	}

	return store;
}
