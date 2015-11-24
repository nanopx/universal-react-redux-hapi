# universal-react-redux-hapi
A boilerplate using React + Redux + hapi + Router5, with Server-side rendering and hot-reloads.

## Features
* Server-side rendering + hot reloads (no checksum errors!)
* React
* Redux
* Router5
* hapi.js + API proxying with h2o2
* Babel6
* webpack
* ESLint
* React Helmet
* Radium + react-styling
* redux-promise and async/await(via babel)
* tests using mocha, nock & power-assert (power-assert supports async/await)

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

**Testing**
```
$ npm test
```

> **NOTE:** Currently, changing the `./src/server.js` will not reload the browser on change, but
normally you wont need to be changing it.

> I'm planning to fix this soon, but only if it doesn't make the boilerplate more complex.

## TODO
- [] Create a better example app and example tests
- [] Browser reload when server-side script changes

## License
MIT
