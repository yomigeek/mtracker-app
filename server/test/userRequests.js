import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();
chai.use(chaiHttp);
let token;
let adminToken;
const badToken = 'wdcjdcsdkjhshsdADDSKKSDKLKLSDKLSLKKLSDJKJKSJwqjkwkd3ndcjdbm';
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
        res.should.have.status(500);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on title less than 6 characters on /api/v1/users/requests POST', (done) => {
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
        res.should.have.status(500);
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

  // Updating User Requests

  it('should fail on empty title on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: ' ', description: 'Cable in office B is faulty', priority: 'high' })
      .end((err, res) => {
        res.should.have.status(500);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });

  it('should fail on title less than 10 characters on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
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

  it('should fail on empty description on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: 'Burnt laptop charger cable', description: ' ', priority: 'high' })
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

  it('should fail on description less than 10 characters on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: 'Burnt laptop charger cable', description: 'Burnt', priority: 'high' })
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

  it('should fail on empty priority on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: 'Burnt laptop charger cable', description: 'Burnt charger for office laptop', priority: ' ' })
      .end((err, res) => {
        res.should.have.status(500);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('fail');

        done();
      });
  });


  it('should fail on priority not equal to either low, high or medium on update a SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: 'Burnt laptop charger', description: 'Burnt laptop charger', priority: 'good' })
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

  it('should return success on update a pending SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: 'Burnt laptop charger', description: 'My laptop charger is faulty', priority: 'medium' })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        res.body.status.should.equal('success');

        done();
      });
  });

  it('should return fail on update a pending SINGLE request using invalid token on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', badToken)
      .send({ title: 'Burnt laptop charger', description: 'My laptop charger is faulty', priority: 'medium' })
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property('message');

        done();
      });
  });

  it('should login an admin user account on /api/v1/auth/login POST', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@gmail.com', password: '123456',
      })
      .end((err, res) => {
        res.should.have.status(200);
        adminToken = res.body.data.mytoken;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        done();
      });
  });

  it('should return on success on approve user requests with valid token on /api/v1/requests/requestId/approve PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/requests/${4}/approve`)
      .set('x-access-token', adminToken)
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

  it('should return fail on update an approved SINGLE request on /api/v1/users/requests/requestId PUT', (done) => {
    chai.request(app)
      .put(`/api/v1/users/requests/${4}`)
      .set('x-access-token', token)
      .send({ title: 'Burnt laptop charger', description: 'My laptop charger is faulty', priority: 'medium' })
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
