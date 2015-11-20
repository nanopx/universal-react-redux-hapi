import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Link from './Link';
import { routeNodeSelector } from 'redux-router5';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  style = {
    button: {
      color: 'red',
    },
  }

  render() {
    return (
      <div className="Home">
        <Helmet title="Home" />
        Home
        <Link name="home" options={{ replace: true }}>home</Link>
				<Link name="counter" options={{ replace: true, reload: true }}>counter</Link>
		  </div>
    );
  }
}

export default connect(routeNodeSelector('home'))(Home);
