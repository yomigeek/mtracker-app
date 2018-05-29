import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
let token;
let userToken;
const badToken = 'wdcjdcsdkjhshsdADDSKKSDKLKLSDKLSLKKLSDJKJKSJwqjkwkd3ndcjdbm';
// Test user request API/functions
describe('Admin request API Tests', () => {
  it('should login an admin user account on /api/v1/auth/login POST', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@gmail.com', password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.data.mytoken;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        done();
      });
  });

  it('should return fail on fetch ALL user requests without any request existing on /api/v1/requests GET', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on non-existing request user on before user inputs a request on /api/v1/requests/requestId/approve PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${2}/approve`)
      .set('x-access-token', token)
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

  it('should login a user account on /api/v1/auth/login POST', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'user@gmail.com', password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(200);
        userToken = res.body.data.mytoken;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        done();
      });
  });

  it('should add a SINGLE request on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', userToken)
      .send({ title: 'Bad laptop port', description: 'Laptop port is faulty and bad', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');

        done();
      });
  });

  it('should fetch ALL user requests on /api/v1/requests GET', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.data.should.have.property('requests');

        done();
      });
  });

  it('should return fail on fetch ALL user requests with no token on /api/v1/requests GET', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return fail on fetch ALL user requests with invalid token on /api/v1/requests GET', (done) => {
    chai.request(app)
      .get('/api/v1/requests')
      .set('x-access-token', badToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return fail on admin approve user requests with no token on /api/v1/requests/requestId/approve PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${1}/approve`)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return fail on fetch ALL user requests with invalid token on /api/v1/requests PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${1}/approve`)
      .set('x-access-token', badToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return on success on approve user requests with valid token on /api/v1/requests PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${1}/approve`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return on fail on already approved user requests with valid token on /api/v1/requests PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${1}/approve`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('fail');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return on fail on non existing user requests with valid token on after user inputs a request on /api/v1/requests PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${2}/approve`)
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('fail');
        res.body.should.have.property('message');
        done();
      });
  });
});

