'use strict';

const UserError = require('..');

function fail() {
  throw new UserError('something failed', {
    test: 'foobar',
    code: 1234
  });
}

try {
  fail();
} catch (err) {
  console.log(JSON.stringify(err));
  // => {"test":"foobar","code":1234,"name":"UserError",
  //     "message":"something failed"}
}

