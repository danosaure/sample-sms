export const NUMBER_OF_MESSAGES_TO_SEND = process.env.NUMBER_OF_MESSAGES_TO_SEND || 1000;
export const MESSAGE_MAX_LENGTH = process.env.MESSAGE_MAX_LENGTH || 100;
export const MAX_WORD_LENGTH = process.env.MAX_WORD_LENGTH || 9;
export const JOIN_STRING = ' ';

export const MAX_WORD_COUNT = Math.floor(MESSAGE_MAX_LENGTH / (MAX_WORD_LENGTH + JOIN_STRING.length));
export const MIN_WORD_COUNT = Math.floor(MAX_WORD_LENGTH / 3);
