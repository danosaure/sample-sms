// FIXME: handle Proxy.
export default (req, path) => {
  const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  if (path) {
    url.pathname = path;
  }
  return url.toString();
};
