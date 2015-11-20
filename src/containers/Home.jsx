import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from './Link';
import { routeNodeSelector } from 'redux-router5';
import { buttonMixin } from '../styles/mixins';

class Home extends Component {
  style = {
    button: {
      color: 'red',
    },
  }

  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div className="Home">
        Home
        <Link name="home" options={{ replace: true }}>home</Link>
				<Link name="counter" options={{ replace: true, reload: true }}>counter</Link>
		  </div>
    );
  }
}

export default connect(routeNodeSelector('home'))(Home);
