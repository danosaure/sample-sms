import moduleToTest from './generate-phone-number';

import filespace from './_.test';

const PHONE_REGEXP = /^\+1[2-9][0-9]{9}$/;

describe(filespace(__filename), () => {
  it('exports a function with no params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(0);
  });

  describe('()', () => {
    it('returns a phone number', () => {
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
      expect(moduleToTest()).to.match(PHONE_REGEXP);
    });
  });
});
