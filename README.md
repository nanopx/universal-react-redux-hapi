# universal-react-redux-hapi
A boilerplate using React + Redux + hapi + Router5, with Server-side rendering and hot-reloads.

[![Dependency Status](https://david-dm.org/nanopx/universal-react-redux-hapi.svg?style=flat-square)](https://david-dm.org/nanopx/universal-react-redux-hapi)
[![devDependency Status](https://david-dm.org/nanopx/universal-react-redux-hapi/dev-status.svg?style=flat-square)](https://david-dm.org/nanopx/universal-react-redux-hapi#info=devDependencies)

## Features
* Server-side rendering + hot reloads
* [React](https://facebook.github.io/react/)
  - For the UI.
* [Radium](http://projects.formidablelabs.com/radium/) + [react-styling](https://github.com/halt-hammerzeit/react-styling)
  - For inline styles, which works perfectly with server-side rendering and React's virtual DOM.
* [React Helmet](https://github.com/nfl/react-helmet)
  - For changing `<title>` tag, `<meta>` tags, etc in React.
* [Redux](http://redux.js.org/)
  - For managing app's state.
* [Router5](http://router5.github.io/)
  - For routing.
* [hapi.js](http://hapijs.com/) + [h2o2](https://github.com/hapijs/h2o2)
  * For web server, web APIs, and proxying.
* [webpack](http://webpack.github.io/)
  * For building client bundles.
* [Babel6](https://babeljs.io/)
  * For transpiling ES6(ES2015), and ES7(ES2016).
* [ESLint](http://eslint.org/)
  * For linting.
* [mocha](https://mochajs.org/), [nock](https://github.com/pgte/nock) & [power-assert](https://github.com/power-assert-js/power-assert)
  * For testing.
  * power-assert supports async/await, which can be used with [redux-promise](https://github.com/acdlite/redux-promise)

> Personally, I think Router5 is better for managing the `props` than [React Router](https://github.com/rackt/react-router).
> No `React.cloneElement` with `this.props.children`, no confusion with React's `props`, etc.


## Getting started
**First steps...**
```
$ git clone https://github.com/nanopx/universal-react-redux-hapi.git MyApp
$ cd MyApp
$ npm install
```

**Start development server**
```
$ npm start
```

**Start production server**
```
$ NODE_ENV=production npm run build
$ NODE_ENV=production npm start
```

**Linting**
```
$ npm run lint
```
`$ npm start` in development mode, will also lint your codes every time it builds.


**Testing**
```
$ npm test
```

> **NOTE:** Currently, changing the `./src/server.js` will not reload the browser on change, but
normally you wont need to change it.

> I'm planning to fix this soon, but only if it doesn't make the boilerplate more complex.

## TODO
- [ ] Create a better example app and example tests
- [ ] Browser reload when `./src/server.js` changes
- [ ] Find a way to reload components without the Server-side rendering warnings. -> checking [here](https://github.com/gaearon/babel-plugin-react-transform/issues/46) for babel6 support

## License
MIT
