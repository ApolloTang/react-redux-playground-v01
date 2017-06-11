
// @TODO handle Error not yet impliment
const handleError => (fetchError) => {
  // const error = {
  //   message: xhr.statusText,
  //   code: xhr.status,
  //   body: xhr.responseJSON,
  //   bodyText: xhr.responseText
  // };
  //
  // if (xhr.status === 401 && options.redirectOnFail) {
  //   handle401();
  //
  // } else if (xhr.status === 401) {
  //   log.error('Unauthorized');
  //
  // } else if (xhr.status === 412) {
  //   // alert('Precondition failed');
  //   log.error('Resource was modified by another user. To prevent overwriting, your changes have not been saved. Please refresh the page and try again.');
  //
  // } else if (xhr.status >= 500) {
  //   handle500(xhr);
  //
  //   // } else if (xhr.status === 400) {
  //   // createServerErrorAsToastr(error);
  // } else {
  //   console.error(xhr.responseText);
  // }
}


export default handleError;

