export default (value, defaultValue) => {
  if (typeof value === 'undefined') {
    return defaultValue;
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return value.toString();
  } catch (e) {
    return undefined;
  }
};
