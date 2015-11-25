import {
  REPOSITORY_SEARCH,
  REPOSITORY_STOP_SEARCH,
  REPOSITORY_START_SEARCH,
} from '../actionTypes';

const initialState = {
  isLoading: true,
  fetchedCount: 0,
  totalCount: 0,
  repositories: {},
  users: {},
  queries: {},
};

export default function stargazers(state = initialState, action) {
  switch (action.type) {

  case REPOSITORY_SEARCH:
    const {entities, result, queries} = action.payload.repositories;
    return Object.assign({}, state, {
      repositories: entities.repositories,
      users: entities.users,
      fetchedCount: result.items.length,
      totalCount: result.total_count,
      queries: queries,
    });

  case REPOSITORY_START_SEARCH:
    return Object.assign({}, state, {
      isLoading: true,
    });

  case REPOSITORY_STOP_SEARCH:
    return Object.assign({}, state, {
      isLoading: false,
    });

  default:
    return initialState;

  }
}
