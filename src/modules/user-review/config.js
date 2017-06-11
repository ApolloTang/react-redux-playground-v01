import * as rootConfig from 'root/config';

const nameSpace = 'userReview';

let api_urlAndPort;
if (rootConfig.PROD) {
  api_urlAndPort = 'https://apollotang-webapp-demo-api.herokuapp.com';
} else if (rootConfig.TEST) {
  api_urlAndPort = 'http://localhost:3000';
} else {
  api_urlAndPort = 'http://localhost:3000';
}

const rootUrl = `${api_urlAndPort}/api`;

const out = {
  nameSpace, rootUrl, api_urlAndPort
};
console.log('user-review.config: ', out);

export {
  nameSpace, rootUrl, api_urlAndPort
};

