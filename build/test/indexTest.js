'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _connect = require('../models/connect');

var _connect2 = _interopRequireDefault(_connect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;

var server = (0, _supertest2.default)(_index2.default);

describe('iReporter', function () {
  describe('all red flags', function () {
    it('should return all red-flag records', async function () {
      var response = await server.get('/api/v1/red-flags');
      expect(response.status).to.equal(200);
    });
  });

  describe('create red-flag', function () {
    it('should create red-flag record', async function () {
      var oldData = _connect2.default.length;
      var response = await server.post('/api/v1/red-flags').send({
        id: '10',
        type: 'red-flag',
        location: 'Test location',
        status: 'Pending',
        comment: 'Hello from the test file'
      });
      expect(response.status).to.equal(201);
      expect(response.body.data[0].message).to.equal('Created red-flag record');
      expect(_connect2.default.length).to.equal(oldData + 1);
    });
  });

  describe('single red flag', function () {
    it('should return single red-flag record', async function () {
      var redFlag = _connect2.default[0];
      var response = await server.get('/api/v1/red-flags/' + redFlag.id);
      expect(redFlag).to.have.property('id').to.equal(redFlag.id);
      expect(response.body).to.have.property('data');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('edit location', function () {
    it('should return 200 status indicating successful edit', async function () {
      var response = await server.patch('/api/v1/red-flags/101/location').send({
        location: 'Test location'
      });
      expect(response.status).to.equal(200);
      expect(response.body.data[0].message).to.equal('Updated red-flag record\'s comment');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('edit comment', function () {
    it('should return 200 status indicating successful edit', async function () {
      var response = await server.patch('/api/v1/red-flags/101/comment').send({
        comment: 'This is a test comment'
      });
      expect(response.status).to.equal(200);
      expect(response.body.data[0].message).to.equal('Updated red-flag record’s comment');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('delete red-flag record', function () {
    it('should return 200 status indicating a successful delete', async function () {
      var redFlag = _connect2.default[0];
      var response = await server.delete('/api/v1/red-flags/' + redFlag.id);
      expect(response.status).to.equal(200);
      expect(response.body.data[0].message).to.equal('red-flag record has been deleted');
      expect(response.body.data).to.be.an('array');
    });
  });
});