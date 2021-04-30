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

  SUCCESS: Object.freeze({
    KEY: 'success',
    DEFAULT: false,
    sanitize: (value) => ((typeof value === 'boolean') ? value : null),
    validate: (value) => (typeof value === 'boolean'),
  }),

  fields: () => Object.freeze([
    FORM.ERROR,
    FORM.MESSAGE_ID,
    FORM.SENDER_ID,
    FORM.SUCCESS,
  ]),

});

export default FORM;
