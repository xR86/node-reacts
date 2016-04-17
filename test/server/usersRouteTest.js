var should = require('should');
var users = require('../../server/routes/users');

describe('Test suite for Users routes.', function () {
  before(function (done) {
    //Some pre-requisites
    console.log('Pregatim ceva aici.');
    done();
  });

  describe('Function processQueryString ', function () {
    before(function (done) {
      var result;
      var queryWithYear = {year: 1};
      done();
    });

    it(' should return empty object for empty string.', function (done) {
      result = users.processQueryString('');
      Object.keys(result).length.should.equal(0);
      done();
    });

    it(' should return empty object for null.', function (done) {
      result = users.processQueryString(null);
      Object.keys(result).length.should.equal(0);
      done();
    });

    it(' should be able to process positive year', function (done) {
      result = users.processQueryString({year: 1});
      result.year.should.equal(1);
      done();
    });
  });

  describe('Function processPageQueryString ', function () {
    before(function (done) {
      var result;
      done();
    });

    it(' should have no page for negative values.', function (done) {
      result = users.processPageQueryString({page: -1, size: -2});
      Object.keys(result).length.should.equal(0);
      done();
    });

    it(' should not have page for 0 index based requests.', function (done) {
      result = users.processPageQueryString({page: 0, size: 2});
      Object.keys(result).length.should.equal(0);
      done();
    });

    it(' should have page for positive values, larger that 1.', function (done) {
      var page = 2;
      var size = 2;
      result = users.processPageQueryString({page: page, size: size});
      result.skip.should.be.equal((page - 1) * size);
      result.limit.should.be.equal(size);
      done();
    });
  })
});
