import fetchMock from 'fetch-mock';

import moduleToTest from './get-hal';

import filespace from './_.test';

const URL = 'http://foo.bar/hello/world';

describe(filespace(__filename), () => {
  it('exports a function with 1 param', () => {
    expect(moduleToTest).to.be.a('function').and.to.have.lengthOf(1);
  });

  describe('()', () => {
    beforeEach(() => {
      console.log('fetchMock.mock()...');
      fetchMock.mock({
        url: URL,
        response: {
          foo: 'bar',
        },
      });
    });
    afterEach(() => {
      console.log('fetchMock.restore()');
      fetchMock.restore();
    });

    // FIXME: This fetchMock doesn't seem to work.
    it.skip('gets answer in correct format', async () => {
      const res = await moduleToTest(URL);
      expect(res).to.deep.equal({});
    });
  });
});
