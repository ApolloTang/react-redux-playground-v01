
const get = (url, /* params = {} */ ) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const init = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  const request = new Request(url, init);

  return fetch(request).then(
    response => {
      if (!response.ok) {
        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/#comment-2254295840
        // throw Error(response.statusText);
        return { httpError: response };
      }
      return response.json()
    }
  );
};

const post = (url, payload, /* opts */ ) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestBody = JSON.stringify(payload);

  const init = {
    method: 'POST',
    headers: headers,
    mode: 'cors',
    cache: 'default',
    body: requestBody
  };

  const request = new Request(url, init);

  return fetch(request).then(
    response => response.json()
  );
};

const put = (url, payload, /* opts */ ) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestBody = JSON.stringify(payload);

  const init = {
    method: 'PUT',
    headers: headers,
    mode: 'cors',
    cache: 'default',
    body: requestBody
  };

  const request = new Request(url, init);

  return fetch(request).then(
    response => response.json()
  );
};

const del = (url) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const init = {
    method: 'DELETE',
    headers: headers,
    mode: 'cors',
    cache: 'default',
  };

  const request = new Request(url, init);

  return fetch(request).then(
    response => response.json()
  );
};

export default { get, post, put, del };
