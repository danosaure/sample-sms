export default (value, defaultValue) => (typeof value === 'undefined' ? defaultValue : parseInt(value, 10));
