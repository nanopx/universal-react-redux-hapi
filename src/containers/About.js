import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from './Link';
import { routeNodeSelector } from 'redux-router5';

class About extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="About">
        About
				<Link name="home" options={{ reload: true }}>home</Link>
				<Link name="about" options={{ reload: true }}>about</Link>
		  </div>
    );
  }
}

export default connect(routeNodeSelector('about'))(About);
