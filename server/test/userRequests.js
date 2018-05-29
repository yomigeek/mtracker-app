import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
let token;

// Test user request API/functions
describe('User request API Tests', () => {
  it('should login a user account on /api/v1/auth/login POST', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi@gmail.com', password: '123456',
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

  it('should return fail on fetch ALL user requests without any request existing on /api/v1/users/requests GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
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

  it('should fail on fetch a user request detail on non-existing request on /api/v1/users/requests GET', (done) => {
    chai.request(app)
      .get(`/api/v1/users/requests/${10}`)
      .set('x-access-token', token)
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

  it('should add a SINGLE request on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({ title: 'Burnt cable in office', description: 'Cable in office B is faulty', priority: 'high' })
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

  it('should fail on empty title on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
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

  it('should fail on title less than 10 characters on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({ title: 'Burnt', description: 'Cable in office B is faulty', priority: 'high' })
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

  it('should fail on empty description on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({ title: 'Burnt office cable', description: ' ', priority: 'high' })
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

  it('should fail on description less than 10 characters on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({ title: 'Burnt office cable', description: 'The', priority: 'high' })
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

  it('should fail on empty priority value on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({ title: 'Burnt office cable', description: 'The office cable is bad', priority: ' ' })
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

  it('should fail on priority value not equal to either low, high or medium on /api/v1/users/requests POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({ title: 'Burnt office cable', description: ' ', priority: 'higher' })
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

  it('should fetch ALL user requests on /api/v1/users/requests GET', (done) => {
    chai.request(app)
      .get('/api/v1/users/requests')
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

  it('should fetch a user request detail on /api/v1/users/requests GET', (done) => {
    chai.request(app)
      .get(`/api/v1/users/requests/${4}`)
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
});

