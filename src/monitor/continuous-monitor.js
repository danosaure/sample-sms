import getAndDisplayStatus from './get-and-display-status';

export default async (href, delay) => {
  getAndDisplayStatus(href);
  setInterval(() => getAndDisplayStatus(href), delay * 1000);
};
