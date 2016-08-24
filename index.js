'use strict';

const _ = {};
_.assign = require('lodash.assign');

function has(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function UserError(message, properties) {
  if (typeof message === 'object' && message !== null) {
    properties = message;
    message = null;
  } else if (typeof message === 'undefined') {
    message = null;
  }

  _.assign(this, properties);

  if (!has(this, 'name')) {
    this.name = this.constructor.name;
  }

  if (!has(this, 'message') || message !== null) {
    this.message = message;
  }

  if (!has(this, 'stack')) {
    Error.captureStackTrace(this, this.constructor);
  }
}

UserError.prototype = Object.create(Error.prototype, {
  constructor: {value: UserError, configurable: true, writable: true}
});

module.exports = UserError;

