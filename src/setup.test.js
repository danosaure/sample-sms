import 'babel-regenerator-runtime';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import dirtyChai from 'dirty-chai';

chai.use(dirtyChai);
chai.use(chaiAsPromised);

global.expect = chai.expect;
