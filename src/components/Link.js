import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-router5';

class Link extends Component {
  constructor(props, context) {
    super(props);
		this.router = context.router;
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    console.log(this.router);
    this.props.navigateTo(this.props.name, this.props.params, this.props.options);
  }

	render() {
    const className = this.router.isActive(this.props.name, this.props.params) ? 'active' : '';
    const href = this.router.buildUrl(this.props.name);
    return <a className={className} href={href} onClick={this.onClick}>{ this.props.children }</a>;
	}
}

Link.propTypes = {
  name: PropTypes.string.isRequired,
  params: PropTypes.object,
  options: PropTypes.object,
  navigateTo: PropTypes.func.isRequired
};

Link.defaultProps = {
  params: {},
  options: {}
};

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  state => state.router,
  dispatch => bindActionCreators({ navigateTo: actions.navigateTo }, dispatch)
)(Link);
