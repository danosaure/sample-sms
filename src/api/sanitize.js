export default (FORM, body) => Object.freeze(FORM.fields().reduce(
  (sanitized, field) => ({
    ...sanitized,
    [field.KEY]: field.sanitize(body[field.KEY]),
  }),
  {},
));
