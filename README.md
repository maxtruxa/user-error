# @maxtruxa/user-error

[![npm Version][npm-image]][npm-url]
[![npm Downloads][downloads-image]][downloads-url]
[![Test Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![MIT Licensed][license-image]][license-url]

npm package that simplifies inheriting from `Error`.

```js
const UserError = require('@maxtruxa/user-error');

throw new UserError('Hello, World!', {additional: 'information'});
```

## Installation

```bash
npm install @maxtruxa/user-error
```

## Features

- Subclasses `Error` without breaking standard behavior.
- Like `Error`, `UserError` takes a message as first argument.
- Add properties by simply passing in an object as second or first argument
- Properties are enumerable.
  That means serialization using `JSON.stringify` works as expected.

## Usage

Just `require` the package to get `UserError` and either build your own error class on top of it or use it directly.

### Direct Usage

```js
const UserError = require('@maxtruxa/user-error');

throw new UserError('oops', {additional: 'information'});
```

### Inheriting

```js
const UserError = require('@maxtruxa/user-error');

// Custom error class that takes an additional "error id" as first argument.
function MyError(id, message, properties) {
  UserError.call(this, message, properties);
  this.id = id;
}

MyError.prototype = Object.create(UserError.prototype, {
  constructor: {value: MyError, configurable: true, writable: true}
});

throw new MyError('foo_error', 'oops');
```

When nesting exceptions, the inner exception should be called `inner` by convention:

```js
try {
  throw new UserError('oops');
} catch (err) {
  // "MyError" from the inheritance example above.
  throw new MyError('internal_error', 'something failed', {inner: err});
}
```

## API

### new UserError(message, properties)

Create a new error with the specified message and properties.

The resulting object has the following properties:

- `name`
- `message`
- `stack`
- additional properties (copied from the `properties` argument)

`name` is taken from (in that order):
- `properties.name` (useful for overriding the name without inheriting)
- `this.constructor.prototype.name` (useful for minified code)
- `this.constructor.name`

`message` is taken from (in that order):
- `properties.message`
- `message`

`stack` is taken from (in that order):
- `properties.stack`
- generated using `Error.captureStackTrace` (if available)

#### message

*anything* (default = `''`)

The `message` property of the error. The value is always converted to a *string*.

```js
new UserError(); // default

new UserError('test');
```

#### properties

*object* (default = `{}`)

Additional properties to be assigned to the error.

```js
new UserError(); // default

new UserError({foo: 'bar'}); // without message

new UserError('test', {baz: 'qux'}); // with message
```

## Tests

To run the test suite, install dependencies, then run `npm test`:

```bash
npm install
npm test
```

Coverage reports are generated by running `npm run coverage`.
Linting is done with `npm run lint`.


[npm-image]: https://img.shields.io/npm/v/user-error.svg
[npm-url]: https://npmjs.org/package/user-error
[downloads-image]: https://img.shields.io/npm/dm/user-error.svg
[downloads-url]: https://npmjs.org/package/user-error
[travis-image]: https://img.shields.io/travis/maxtruxa/user-error/master.svg
[travis-url]: https://travis-ci.org/maxtruxa/user-error
[coveralls-image]: https://coveralls.io/repos/github/maxtruxa/user-error/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/maxtruxa/user-error?branch=master
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://raw.githubusercontent.com/maxtruxa/user-error/master/LICENSE

