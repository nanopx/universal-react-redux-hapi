import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Link from '../components/Link';
import { bindActionCreators } from 'redux';
import { actions, routeNodeSelector } from 'redux-router5';

class About extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div className="About">
        About
				<Link name='home' options={{ reload: true }}>home</Link>
				<Link name='about' options={{ reload: true }}>about</Link>
		  </div>
    )
	}
}

export default connect(routeNodeSelector('about'))(About);
