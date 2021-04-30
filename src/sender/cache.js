const cache = {};

const ATTRIBUTES = Object.freeze({
  ID: 'sender-id',
});

export const setSenderId = (id) => {
  cache[ATTRIBUTES.ID] = id;
};

export const getSenderId = () => cache[ATTRIBUTES.ID];
