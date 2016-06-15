'use strict';

const UserError = require('..');

function fail() {
  throw new UserError('something failed');
}

function fail2() {
  throw new UserError('something else failed', {foo: 'bar'});
}

try {
  fail();
} catch (err) {
  console.error(err);
  // => { [UserError: something failed]
  //      name: 'UserError',
  //      message: 'something failed' }
  console.error(err.stack);
  // => UserError: something failed
  //        at fail (/xxx/user-error/examples/simple.js:6:9)
  //        ...
}

try {
  fail2();
} catch (err) {
  console.error(err);
  // { [UserError: something else failed]
  //   foo: 'bar',
  //   name: 'UserError',
  //   message: 'something else failed' }
  console.error(err.stack);
  // => UserError: something else failed
  //        at fail2 (/xxx/user-error/examples/simple.js:10:9)
  //        ...
}

