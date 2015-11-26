import url from 'url';

// Endpoint that proxies all GitHub API requests to https://api.github.com.
export default {
  method: 'GET',
  path: '/api/github/{path*}',
  handler: {
    proxy: {
      passThrough: true,
      mapUri(request, callback) {
        callback(null, url.format({
          protocol: 'https',
          host: 'api.github.com',
          pathname: request.params.path,
          query: request.query,
        }));
      },
      onResponse(err, res, request, reply/** , settings, ttl **/) {
        reply(res);
      },
    },
  },
};
