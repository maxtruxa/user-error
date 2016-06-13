'use strict';

const BaseError = require('..');

function fail() {
  throw new BaseError('something failed', {
    test: 'foobar',
    code: 1234
  });
}

try {
  fail();
} catch (err) {
  console.log(JSON.stringify(err));
  // => {"test":"foobar","code":1234,"name":"BaseError",
  //     "message":"something failed"}
}

