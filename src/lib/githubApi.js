import fetch from 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';

const repository = new Schema('repositories');
const user = new Schema('users');

repository.define({
  owner: user,
});

let githubApi = 'https://api.github.com';
if (__CLIENT__) {
  const { hostname, port } = window.location;
  githubApi = `http://${hostname}:${port}/api/github`;
}

const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join('-');
};

export const searchRepository = (query = '', language = 'javascript', created = getYesterday(), sort = 'stars', order = 'desc') => {
  return fetch(githubApi + `/search/repositories?q=${query} created:${created} language:${language}&sort=${sort}&order=${order}`)
  .then((response) => response.json())
  .then((body) => {
    return new Promise((resolve) => {
      // Resolve with results formatted by normalizr
      resolve(Object.assign({}, normalize(body, {items: arrayOf(repository)}), {
        queries: {
          searchString: query,
          language,
          created,
          sort,
          order,
        },
      }));
    });
  });
};
