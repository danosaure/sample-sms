const senders = [];

export const get = () => senders.shift();
export const add = (sender) => senders.push(sender);
