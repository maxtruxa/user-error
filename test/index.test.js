'use strict';

const expect = require('expect.js');
const UserError = require('..');

function inherits(target, source) {
  target.prototype = Object.create(source.prototype, {
    constructor: {value: target, configurable: true, writable: true}
  });
}

describe('UserError', function() {

  it('is exported', function() {
    expect(UserError).to.be.a('function');
  });

  describe('#constructor', function() {

    it('is an instance of UserError', function() {
      let err = new UserError();
      expect(err).to.be.a(UserError);
    });

    it('is an instance of Error', function() {
      let err = new UserError();
      expect(err).to.be.an(Error);
    });

    // name

    it('sets name from contructor prototype', function() {
      function CustomError() { UserError.call(this); }
      inherits(CustomError, UserError);
      CustomError.prototype.name = 'FooError';

      let err = new CustomError();
      expect(err).to.have.own.property('name', 'FooError');
    });

    it('sets name from contructor', function() {
      function CustomError() { UserError.call(this); }
      inherits(CustomError, UserError);

      let err = new CustomError();
      expect(err).to.have.own.property('name', 'CustomError');
    });

    it('sets name from properties', function() {
      let err = new UserError(undefined, {name: 'FooError'});
      expect(err).to.have.own.property('name', 'FooError');
    });

    // message

    it('sets message to an empty string if none is given', function() {
      let err = new UserError();
      expect(err).to.have.own.property('message', '');
    });

    it('sets message', function() {
      let err = new UserError('foo bar');
      expect(err).to.have.own.property('message', 'foo bar');
    });

    it('sets message from properties', function() {
      let err = new UserError(undefined, {message: 'foo'});
      expect(err).to.have.own.property('message', 'foo');
    });

    it('converts message to string', function() {
      let err = new UserError(1234);
      expect(err).to.have.own.property('message', '1234');
    });

    it('prefers message from properties', function() {
      let err = new UserError('foo', {message: 'bar'});
      expect(err).to.have.own.property('message', 'bar');
    });

    // properties

    it('sets additional properties', function() {
      let err = new UserError(undefined, {foo: 'bar', baz: 42});
      expect(err).to.have.own.property('foo', 'bar');
      expect(err).to.have.own.property('baz', 42);
    });

    it('accepts properties as first argument', function() {
      let err = new UserError({foo: 'bar'});
      expect(err).to.have.own.property('message', '');
      expect(err).to.have.own.property('foo', 'bar');
    });

    // stack

    it('sets stack', function() {
      let err = new UserError('foo');
      expect(err).to.have.own.property('stack');
      let stack = err.stack.split(/\n\s*/);
      expect(stack[0]).to.equal('UserError: foo');
      expect(stack[1]).to.contain('test/index.test.js');
    });

    it('sets stack from properties', function() {
      let stack = {};
      let err = new UserError({stack});
      expect(err).to.have.own.property('stack', stack);
    });

  });

  describe('#toString', function() {

    it('returns correctly formatted string', function() {
      let err = new UserError({name: 'CustomError'});
      expect(err.toString()).to.equal('CustomError');
    });

    it('returns correctly formatted string with message', function() {
      let err = new UserError('test');
      expect(err.toString()).to.equal('UserError: test');
    });

  });

  describe('JSON.stringify', function() {

    it('serializes name and message', function() {
      let err = new UserError('test');
      let str = JSON.stringify(err);
      let obj = JSON.parse(str);
      expect(obj).to.have.own.property('name', 'UserError');
      expect(obj).to.have.own.property('message', 'test');
    });

    it('serializes additional properties', function() {
      let err = new UserError({foo: 'bar', baz: 'qux'});
      let str = JSON.stringify(err);
      let obj = JSON.parse(str);
      expect(obj).to.have.own.property('foo', 'bar');
      expect(obj).to.have.own.property('baz', 'qux');
    });

  });

});

