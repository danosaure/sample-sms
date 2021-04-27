export default () => {
  let phone = '';
  while (phone.length < 10) {
    phone += Math.random().toString().replace(/^[01.]*/, '');
  }
  return `+1${phone.slice(0, 10)}`;
};
