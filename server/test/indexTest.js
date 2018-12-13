import chai from 'chai';
import supertest from 'supertest';
import app from '../index';
import data from '../models/connect';

const { expect } = chai;
const server = supertest(app);


describe('iReporter', () => {
  describe('all red flags', () => {
    it('should return all red-flag records', async () => {
      const response = await server.get('/api/v1/red-flags');
      expect(response.status).to.equal(200);
    });
  });

  describe('create red-flag', () => {
    it('should create red-flag record', async () => {
      const oldData = data.length;
      const response = await server.post('/api/v1/red-flags')
        .send({
          id: '10',
          type: 'red-flag',
          location: 'Test location',
          status: 'Pending',
          comment: 'Hello from the test file',
        });
      expect(response.status).to.equal(201);
      expect(response.body.data[0].message).to.equal('Created red-flag record');
      expect(data.length).to.equal(oldData + 1);
    });
  });

  describe('single red flag', () => {
    it('should return single red-flag record', async () => {
      const redFlag = data[0];
      const response = await server.get(`/api/v1/red-flags/${redFlag.id}`);
      expect(redFlag).to.have.property('id').to.equal(redFlag.id);
      expect(response.body).to.have.property('data');
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('object');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('edit location', () => {
    it('should return 200 status indicating successful edit', async () => {
      const response = await server.patch('/api/v1/red-flags/101/location')
        .send({
          location: 'Test location',
        });
      expect(response.status).to.equal(200);
      expect(response.body.data[0].message).to.equal('Updated red-flag record\'s comment');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('edit comment', () => {
    it('should return 200 status indicating successful edit', async () => {
      const response = await server.patch('/api/v1/red-flags/101/comment')
        .send({
          comment: 'This is a test comment',
        });
      expect(response.status).to.equal(200);
      expect(response.body.data[0].message).to.equal('Updated red-flag record’s comment');
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('delete red-flag record', () => {
    it('should return 200 status indicating a successful delete', async () => {
      const redFlag = data[0];
      const response = await server.delete(`/api/v1/red-flags/${redFlag.id}`);
      expect(response.status).to.equal(200);
      expect(response.body.data[0].message).to.equal('red-flag record has been deleted');
      expect(response.body.data).to.be.an('array');
    });
  });
});
