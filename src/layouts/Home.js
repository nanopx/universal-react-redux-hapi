import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Link from '../components/Link';
import { bindActionCreators } from 'redux';
import { actions, routeNodeSelector } from 'redux-router5';

class Home extends Component {
  constructor(props) {
    super(props);
  }

	render() {
    return (
      <div className="Home">
        Home
        <Link name='home' options={{ reload: true }}>home</Link>
				<Link name='about' options={{ reload: false }}>about</Link>
        <Link name='aaaa' options={{ reload: true }}>NOTFOUND</Link>
		  </div>
    )
	}
}

export default connect(routeNodeSelector('home'))(Home);
