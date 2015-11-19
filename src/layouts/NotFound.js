import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Link from '../components/Link';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-router5';

class NotFound extends Component {
  constructor(props) {
    super(props);
  }

	render() {
		const { navigateTo, route } = this.props;
    return (
      <div className="NotFound">
        NotFound
				<Link name='home' options={{ reload: true }}>home</Link>
		  </div>
    )
	}
}

export default NotFound;
