export default (obj, linkName) => {
  if (obj) {
    const requestedLinkName = linkName || 'self';

    // eslint-disable-next-line no-underscore-dangle
    const links = obj._links || obj.links;
    if (links) {
      const link = links[requestedLinkName];
      return link ? link.href || null : null;
    }
  }

  return null;
};
