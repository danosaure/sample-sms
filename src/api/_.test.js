import filespace, { checkProperties } from '../_.test';

const FIELD_FUNCTIONS = [
  'fields',
  'sanitize',
  'validate',
];

export default (info) => filespace([__dirname, info]);

export const checkField = (name, field) => {
  describe(`.${name}`, () => {
    const formClone = { ...field };
    after(() => expect(formClone).to.be.empty());
    checkProperties(formClone, [
      ['KEY', 'string'],
      ['DEFAULT'],
      ['sanitize', 'function', 1],
      ['validate', 'function', 1],
    ]);
  });
};

export const checkForm = (form) => {
  Object.entries(form).forEach(([key, value]) => {
    if (FIELD_FUNCTIONS.indexOf(key) !== -1) {
      return;
    }

    checkField(key, value);
  });
};

export const checkApi = (name, api) => {
  describe(`.${name}`, () => {
    const clone = { ...api };

    after(() => expect(clone).to.be.empty());

    if (api.KEY) {
      checkProperties(clone, [
        ['KEY', 'string'],
      ]);
    }

    if (api.FORM) {
      checkProperties(clone, [['FORM', 'object']]);
      checkForm(api.FORM);
    }

    if (api.RESULT) {
      checkProperties(clone, [['RESULT', 'object', 'string']]);
    }
  });
};
