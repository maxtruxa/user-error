'use strict';

const util = require('util');
const UserError = require('..');

function MyError(id, message, properties) {
  UserError.call(this, message, properties);
  this.id = id;
}

util.inherits(MyError, UserError);

function fail() {
  throw new MyError('test', 'something failed');
}

try {
  fail();
} catch (err) {
  console.error(err);
  // => { [MyError: something failed]
  //      name: 'MyError',
  //      message: 'something failed',
  //      id: 'test' }
  console.error(err.stack);
  // => MyError: something failed
  //        at fail (/xxx/user-error/examples/inherit.js:14:9)
  //        ...
}

