import moduleToTest from './generate-message';

import filespace from './_.test';

import { MESSAGE_MAX_LENGTH } from './constants';

describe(filespace(__filename), () => {
  it('exports a function with no params', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(0);
  });

  it('generates a string', () => {
    const value = moduleToTest();
    expect(value).to.be.a('string');
  });

  it('generates messages up to MESSAGE_MAX_LENGTH', () => {
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
    expect(moduleToTest()).to.have.lengthOf.within(0, MESSAGE_MAX_LENGTH);
  });

  it('generates different messages', () => {
    const message1 = moduleToTest();
    const message2 = moduleToTest();
    const message3 = moduleToTest();

    expect(message1).to.not.equal(message2);
    expect(message1).to.not.equal(message3);
    expect(message2).to.not.equal(message3);
  });
});
