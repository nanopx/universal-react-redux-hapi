import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
// import Link from './Link';
import * as RepositoryActions from '../actions/repository';

function mapStateToProps(state) {
  return {
    repositories: state.repository,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RepositoryActions, dispatch);
}

class Repositories extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.repositoryStartSearch();
  }

  componentDidMount() {
    this.props.repositorySearch();
  }

  render() {
    // const {fetchedCount, isLoading, repositories, totalCount, users, queries} = this.props.repositories;
    // Repositories: {fetchedCount}/{totalCount} Loading: {JSON.stringify(isLoading)}
    return (
      <div className="Repositories">
        <Helmet title="Repositories example" meta={[
          {name: 'description', content: 'Repository search'},
        ]} />
		  </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
