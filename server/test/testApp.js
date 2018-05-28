import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

// Test user request API/functions
describe('User request API Tests: Dummy Data', () => {
  it('should list a SINGLE request on /api/v1/users/requests/:requestId GET', (done) => {
    chai.request(app)
      .get(`/api/v1/users/requests/${1}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');
        res.body.data.should.have.property('requests');
        res.body.data.requests.should.have.property('id');

        done();
      });
  });

  it('should return fail when using non-existing id on /api/v1/users/requests/:requestId GET', (done) => {
    chai.request(app)
      .get(`/api/v1/users/requests/${31}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });
  it('should update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app)
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: 'Burnt cable in office', description: 'Cable in office B is faulty', priority: 'high' })
          .end((error, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.status.should.equal('success');
            res.body.data.should.have.property('requests');

            done();
          });
      });
  });

  it('should fail on empty title on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app)
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: ' ', description: 'Cable in office B is faulty', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on title less than 10 characters on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app)
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: 'the', description: 'Cable in office B is faulty', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on empty description on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app)
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: 'the office cable', description: ' ', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on description less than 10 characters on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app)
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: 'the office cable', description: 'Cable', priority: 'high' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });

  it('should fail on empty priority on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app)
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: 'the office cable', description: 'Cable in office B is faulty', priority: ' ' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });


  it('should fail on priority not equal to either low, high or medium on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        chai.request(app) 
          .put(`/api/v1/users/requests/${1}`)
          .send({ title: 'the office cable', description: 'Cable in office B is faulty', priority: 'midi' })
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('message');
            res.body.status.should.equal('fail');

            done();
          });
      });
  });
});

