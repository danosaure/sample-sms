export default (start) => {
  const [sec, nanosec] = process.hrtime(start);
  return Math.round(sec * 1000 + nanosec / 1000000);
};
