'use strict';

const expect = require('expect.js');
const UserError = require('..');

function inherits(target, source) {
  target.prototype = Object.create(source.prototype, {
    constructor: {value: target, configurable: true, writable: true}
  });
}

describe('UserError', function() {

  it('should be exported', function() {
    expect(UserError).to.be.a('function');
  });

  describe('#constructor', function() {

    it('should be an instance of UserError', function() {
      let err = new UserError();
      expect(err).to.be.a(UserError);
    });

    it('should be an instance of Error', function() {
      let err = new UserError();
      expect(err).to.be.an(Error);
    });

    // name

    it('should set name from contructor prototype', function() {
      function CustomError() { UserError.call(this); }
      inherits(CustomError, UserError);
      CustomError.prototype.name = 'FooError';

      let err = new CustomError();
      expect(err).to.have.own.property('name', 'FooError');
    });

    it('should set name from contructor', function() {
      function CustomError() { UserError.call(this); }
      inherits(CustomError, UserError);

      let err = new CustomError();
      expect(err).to.have.own.property('name', 'CustomError');
    });

    it('should set name from properties', function() {
      let err = new UserError(undefined, {name: 'FooError'});
      expect(err).to.have.own.property('name', 'FooError');
    });

    // message

    it('should set message to an empty string if none is given', function() {
      let err = new UserError();
      expect(err).to.have.own.property('message', '');
    });

    it('should set message', function() {
      let err = new UserError('foo bar');
      expect(err).to.have.own.property('message', 'foo bar');
    });

    it('should set message from properties', function() {
      let err = new UserError(undefined, {message: 'foo'});
      expect(err).to.have.own.property('message', 'foo');
    });

    it('converts message to string', function() {
      let err = new UserError(1234);
      expect(err).to.have.own.property('message', '1234');
    });

    it('should prefer message from properties', function() {
      let err = new UserError('foo', {message: 'bar'});
      expect(err).to.have.own.property('message', 'bar');
    });

    // properties

    it('should set additional properties', function() {
      let err = new UserError(undefined, {foo: 'bar', baz: 42});
      expect(err).to.have.own.property('foo', 'bar');
      expect(err).to.have.own.property('baz', 42);
    });

    it('should accept properties as first argument', function() {
      let err = new UserError({foo: 'bar'});
      expect(err).to.have.own.property('message', '');
      expect(err).to.have.own.property('foo', 'bar');
    });

    // stack

    it('should set stack', function() {
      let err = new UserError('foo');
      expect(err).to.have.own.property('stack');
      let stack = err.stack.split(/\n\s*/);
      expect(stack[0]).to.equal('UserError: foo');
      expect(stack[1]).to.contain('test/index.test.js');
    });

    it('should set stack from properties', function() {
      let stack = {};
      let err = new UserError({stack});
      expect(err).to.have.own.property('stack', stack);
    });

  });

  describe('#toString', function() {

    it('should return correctly formatted string', function() {
      let err = new UserError({name: 'CustomError'});
      expect(err.toString()).to.equal('CustomError');
    });

    it('should return correctly formatted string with message', function() {
      let err = new UserError('test');
      expect(err.toString()).to.equal('UserError: test');
    });

  });

  describe('JSON.stringify', function() {

    it('should serialize name and message', function() {
      let err = new UserError('test');
      let str = JSON.stringify(err);
      let obj = JSON.parse(str);
      expect(obj).to.have.own.property('name', 'UserError');
      expect(obj).to.have.own.property('message', 'test');
    });

    it('should serialize additional properties', function() {
      let err = new UserError({foo: 'bar', baz: 'qux'});
      let str = JSON.stringify(err);
      let obj = JSON.parse(str);
      expect(obj).to.have.own.property('foo', 'bar');
      expect(obj).to.have.own.property('baz', 'qux');
    });

  });

});

