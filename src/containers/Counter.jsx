import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeNodeSelector } from 'redux-router5';
import Helmet from 'react-helmet';
import Link from './Link';
import ClickCounter from '../components/Counter';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Counter">
        <Helmet title="Counter example" meta={[
          {name: 'description', content: 'Counter example'},
        ]} />
        Counter
        <ClickCounter {...this.props}/>
				<Link name="home" options={{ reload: true }}>Home</Link>
		  </div>
    );
  }
}

Counter = connect(routeNodeSelector('counter'))(Counter);
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
