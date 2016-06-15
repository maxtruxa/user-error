'use strict';

const util = require('util');
const expect = require('expect.js');
const UserError = require('..');

describe('UserError', function() {

  it('should be exported', function() {
    expect(UserError).to.be.a('function');
  });

  describe('constructor', function() {

    it('should be an instance of UserError', function() {
      var err = new UserError();
      expect(err).to.be.an(UserError);
    });

    it('should be an instance of Error', function() {
      var err = new UserError();
      expect(err).to.be.an(Error);
    });

    it('should set name to "UserError"', function() {
      var err = new UserError();
      expect(err).to.have.property('name', 'UserError');
    });

    it('should set message to null if none is given', function() {
      var err = new UserError();
      expect(err).to.have.property('message', null);
    });

    it('should set message', function() {
      var err = new UserError('foo bar');
      expect(err).to.have.property('message', 'foo bar');
    });

    it('should set additional properties', function() {
      var err = new UserError(null, {foo: 'bar'});
      expect(err).to.have.property('foo', 'bar');
    });

    it('should accept properties as first argument', function() {
      var err = new UserError({foo: 'bar'});
      expect(err).to.have.property('message', null);
      expect(err).to.have.property('foo', 'bar');
    });

    it('should set name from properties', function() {
      var err = new UserError({name: 'FooError'});
      expect(err).to.have.property('name', 'FooError');
    });

    it('should set name from constructor', function() {
      function CustomError() {
        UserError.call(this);
      }
      util.inherits(CustomError, UserError);
      let err = new CustomError();
      expect(err).to.have.property('name', 'CustomError');
    });

    it('should set message from properties', function() {
      var err = new UserError({message: 'foo'});
      expect(err).to.have.property('message', 'foo');
    });

    it('should prefer explicit message over properties', function() {
      var err = new UserError('foo', {message: 'bar'});
      expect(err).to.have.property('message', 'foo');
    });

    it('should set stack', function() {
      var err = new UserError('foo');
      expect(err).to.have.property('stack');
      let stack = err.stack.split(/\n\s*/);
      expect(stack[0]).to.equal('UserError: foo');
      expect(stack[1]).to.contain('test/index.test.js');
    });

    it('should set stack from properties', function() {
      let stack = {};
      var err = new UserError({stack});
      expect(err).to.have.property('stack', stack);
    });

  });

  describe('toString()', function() {

    it('should return correctly formatted string for null message', function() {
      var err = new UserError();
      expect(err.toString()).to.equal('UserError: null');
    });

    it('should return correctly formatted string', function() {
      var err = new UserError('test');
      expect(err.toString()).to.equal('UserError: test');
    });

  });

});

