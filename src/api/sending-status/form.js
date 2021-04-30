export const FORM = Object.freeze({
  ERROR: Object.freeze({
    KEY: 'error',
    DEFAULT: '',
    sanitize: (value) => ((typeof value === 'string') ? value.trim() : null),
    validate: (value) => (typeof value === 'string'),
  }),

  MESSAGE_ID: Object.freeze({
    KEY: 'message-id',
    DEFAULT: '',
    sanitize: (value) => ((typeof value === 'string') ? value.trim() : null),
    validate: (value) => (typeof value === 'string'),
  }),

  SENDER_ID: Object.freeze({
    KEY: 'sender-id',
    DEFAULT: '',
    sanitize: (value) => ((typeof value === 'string') ? value.trim() : null),
    validate: (value) => (typeof value === 'string'),
  }),

  fields: () => Object.freeze([
    FORM.MESSAGE_ID,
    FORM.SENDER_ID,
  ]),

});

export default FORM;
