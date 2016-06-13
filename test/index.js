'use strict';

const util = require('util');
const expect = require('expect.js');
const BaseError = require('..');

describe('BaseError', function() {

  it('should be exported', function() {
    expect(BaseError).to.be.a('function');
  });

  describe('constructor', function() {

    it('should be an instance of BaseError', function() {
      var err = new BaseError();
      expect(err).to.be.an(BaseError);
    });

    it('should be an instance of Error', function() {
      var err = new BaseError();
      expect(err).to.be.an(Error);
    });

    it('should set name to "BaseError"', function() {
      var err = new BaseError();
      expect(err).to.have.property('name', 'BaseError');
    });

    it('should set message to null if none is given', function() {
      var err = new BaseError();
      expect(err).to.have.property('message', null);
    });

    it('should set message', function() {
      var err = new BaseError('foo bar');
      expect(err).to.have.property('message', 'foo bar');
    });

    it('should set additional properties', function() {
      var err = new BaseError(null, {foo: 'bar'});
      expect(err).to.have.property('foo', 'bar');
    });

    it('should accept properties as first argument', function() {
      var err = new BaseError({foo: 'bar'});
      expect(err).to.have.property('message', null);
      expect(err).to.have.property('foo', 'bar');
    });

    it('should set name from properties', function() {
      var err = new BaseError({name: 'FooError'});
      expect(err).to.have.property('name', 'FooError');
    });

    it('should set name from constructor', function() {
      function CustomError() {
        BaseError.call(this);
      }
      util.inherits(CustomError, BaseError);
      let err = new CustomError();
      expect(err).to.have.property('name', 'CustomError');
    });

    it('should set message from properties', function() {
      var err = new BaseError({message: 'foo'});
      expect(err).to.have.property('message', 'foo');
    });

    it('should prefer explicit message over properties', function() {
      var err = new BaseError('foo', {message: 'bar'});
      expect(err).to.have.property('message', 'foo');
    });

    it('should set stack', function() {
      var err = new BaseError('foo');
      expect(err).to.have.property('stack');
      let stack = err.stack.split(/\n\s*/);
      expect(stack[0]).to.equal('BaseError: foo');
      expect(stack[1]).to.contain('test/index.js');
    });

    it('should set stack from properties', function() {
      let stack = {};
      var err = new BaseError({stack});
      expect(err).to.have.property('stack', stack);
    });

  });

  describe('toString()', function() {

    it('should return correctly formatted string for null message', function() {
      var err = new BaseError();
      expect(err.toString()).to.equal('BaseError: null');
    });

    it('should return correctly formatted string', function() {
      var err = new BaseError('test');
      expect(err.toString()).to.equal('BaseError: test');
    });

  });

});

