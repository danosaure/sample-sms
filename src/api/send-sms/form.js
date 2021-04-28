// NOTE: This could be done with some JSON Schema or other form-type libraries.

// NOTE: This should be implemented as classes, but for time saving.
export const FORM = Object.freeze({
  MESSAGES: Object.freeze({
    KEY: 'messages',
    DEFAULT: [],

    sanitize: (value) => {
      if (Array.isArray(value)) {
        return value.map((notification) => {
          try {
            return {
              number: notification.number.trim(),
              message: notification.message.trim(),
            };
          } catch (err) {
            return null;
          }
        });
      }

      return FORM.MESSAGES.DEFAULT;
    },

    validate: (value) => {
      if (!Array.isArray(value)) {
        return `${FORM.MESSAGES.KEY} expected to be an array.`;
      }

      const foundError = value.reduce(
        (error, notification, index) => {
          if (error) {
            return error;
          }

          if (!notification) {
            return `${FORM.MESSAGES.KEY}[${index}] missing.`;
          }

          if (!notification.number) {
            return `${FORM.MESSAGES.KEY}[${index}].number missing.`;
          }

          if (!notification.message) {
            return `${FORM.MESSAGES.KEY}[${index}].message missing.`;
          }

          return null;
        },
        null,
      );

      return foundError || true;
    },
  }),

  fields: () => Object.freeze([
    FORM.MESSAGES,
  ]),

});

export default FORM;
