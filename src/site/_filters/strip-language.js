// Strip the language prefix from urls.
// e.g. /en/foo becomes /foo.
module.exports = (url) => {
  const urlParts = url.split('/');
  // TODO: I don't use en or ko
  urlParts.splice(0, 0);
  return urlParts.join('/');
};
