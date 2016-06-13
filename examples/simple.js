'use strict';

const BaseError = require('..');

function fail() {
  throw new BaseError('something failed');
}

function fail2() {
  throw new BaseError('something else failed', {foo: 'bar'});
}

try {
  fail();
} catch (err) {
  console.error(err);
  // => { [BaseError: something failed]
  //      name: 'BaseError',
  //      message: 'something failed' }
  console.error(err.stack);
  // => BaseError: something failed
  //        at fail (/xxx/base-error/examples/simple.js:6:9)
  //        ...
}

try {
  fail2();
} catch (err) {
  console.error(err);
  // { [BaseError: something else failed]
  //   foo: 'bar',
  //   name: 'BaseError',
  //   message: 'something else failed' }
  console.error(err.stack);
  // => BaseError: something else failed
  //        at fail2 (/xxx/base-error/examples/simple.js:10:9)
  //        ...
}

