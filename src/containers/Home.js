import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from './Link';
import { routeNodeSelector } from 'redux-router5';

class Home extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div className="Home">
        Home
        <Link name="home" element="button" options={{ replace: true }}>home</Link>
				<Link name="about" element="button" options={{ replace: true, reload: true }}>about</Link>
		  </div>
    );
  }
}

export default connect(routeNodeSelector('home'))(Home);
