export const FORM = Object.freeze({
  URL: Object.freeze({
    KEY: 'url',
    DEFAULT: '',

    sanitize: (value) => ((typeof value === 'string') ? value.trim() : null),

    validate: (value) => (typeof value === 'string'),
  }),

  fields: () => Object.freeze([
    FORM.URL,
  ]),

});

export default FORM;
