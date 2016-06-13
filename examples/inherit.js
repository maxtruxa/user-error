'use strict';

const util = require('util');
const BaseError = require('..');

function MyError(id, message, properties) {
  BaseError.call(this, message, properties);
  this.id = id;
}

util.inherits(MyError, BaseError);

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
  //        at fail (/xxx/base-error/examples/inherit.js:14:9)
  //        ...
}

