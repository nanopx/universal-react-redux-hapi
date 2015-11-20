import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { routeNodeSelector } from 'redux-router5';
import About from './About';
import Home from './Home';
import NotFound from './NotFound';

const components = {
  home: Home,
  about: About,
};

/**
 * Root component
 */
class Root extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;
    const segment = route ? route.name.split('.')[0] : undefined;
    return (
      <div className="Root">
        {createElement(components[segment] || NotFound)}
        {this.props.children ? this.props.children : null}
      </div>
    );
  }
}

export default connect(routeNodeSelector(''))(Root);
