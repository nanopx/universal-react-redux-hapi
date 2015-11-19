import React, {Component, createElement} from 'react';
import Link from '../components/Link';
import { connect } from 'react-redux';
import { actions, routeNodeSelector } from 'redux-router5';
import { bindActionCreators } from 'redux';
import About from './About';
import Home from './Home';
import NotFound from './NotFound';

const components = {
  home: Home,
  about: About
};

/**
 * Main component
 */
class Main extends Component {
	constructor(props, context) {
    super(props);
  }

  render() {
	  const { route } = this.props;
	  const segment = route ? route.name.split('.')[0] : undefined;
    return (
    	<div className="Main">
				{createElement(components[segment] || NotFound)}
				{this.props.children ? this.props.children : null}
			</div>
    );
	}
}

export default connect(routeNodeSelector(''))(Main);
