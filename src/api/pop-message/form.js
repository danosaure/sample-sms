export const FORM = Object.freeze({
  ID: Object.freeze({
    KEY: 'id',
    DEFAULT: null,

    sanitize: (value) => ((typeof value === 'string') ? value.trim() : ''),

    validate: (value) => typeof value === 'string',
  }),

  fields: () => Object.freeze([
    FORM.ID,
  ]),

});

export default FORM;
