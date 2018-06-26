'use strict';

var hasOwn = Object.prototype.hasOwnProperty;

function UserError(message, properties) {
  if (typeof message === 'object' && message !== null) {
    properties = message;
    message = undefined;
  }

  Object.assign(this, properties);

  // Take name from:
  // - properties.name
  // - this.constructor.prototype.name
  // - this.constructor.name
  var name;
  if (hasOwn.call(this, 'name')) {
    name = this.name;
  } else if (hasOwn.call(this.constructor.prototype, 'name')) {
    name = this.constructor.prototype.name;
  } else {
    name = this.constructor.name;
  }
  this.name = '' + name;

  // Take message from:
  // - properties.message
  // - message
  if (hasOwn.call(this, 'message')) {
    message = this.message;
  }
  this.message = typeof message === 'undefined' ? '' : '' + message;

  // Take stack from:
  // - properties.stack
  // - capture new stacktrace (if captureStackTrace is available)
  if (!hasOwn.call(this, 'stack') && hasOwn.call(Error, 'captureStackTrace')) {
    Error.captureStackTrace(this, this.constructor);
  }
}

UserError.prototype = Object.create(Error.prototype, {
  constructor: {value: UserError, configurable: true, writable: true}
});

// Set name explicitly in case code gets minified.
UserError.prototype.name = 'UserError';

module.exports = UserError;

