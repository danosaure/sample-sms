import moduleToTest from './string-with-default';

import filespace from './_.test';

describe(filespace(__filename), () => {
  it('exports a function with 2 params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(2);
  });

  describe('()', () => {
    it('returns undefined when called with params', () => {
      expect(moduleToTest()).to.be.undefined();
    });

    it('returns first param if string', () => {
      const value = 'foo';
      expect(moduleToTest(value)).to.equal(value);
    });

    it('returns first param as a string if a number', () => {
      const value = 1;
      expect(moduleToTest(value)).to.equal('1');
    });

    it('returns first param as a string if an array', () => {
      const value = [1, 2, 3];
      expect(moduleToTest(value)).to.equal('1,2,3');
    });

    it('returns first param as a string if an object', () => {
      const value = { foo: 'bar' };
      expect(moduleToTest(value)).to.equal('[object Object]');
    });

    it('returns undefined if first param is null', () => {
      const value = null;
      expect(moduleToTest(value)).to.be.undefined();
    });

    it('returns defaultValue when first param undefined', () => {
      const defaultValue = 'foo';
      expect(moduleToTest(undefined, defaultValue)).to.equal(defaultValue);
    });

    it.skip('...we can test more edge cases...');
  });
});
