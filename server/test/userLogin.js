import { describe, it, before, after } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

// Test user signup API/functions
describe('User Login API Tests', () => {
  it('should login a user account on /api/v1/auth/login POST', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi@gmail.com', password: '123456',
      })
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

  it('should not login a if user account does not exist with the email on /api/v1/auth/login POST', (done) => {

    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi@gmail.com', password: '1234567',
      })
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

  it('should return fail on using space email on /api/v1/auth/signup POST', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: ' ', password: '123456',
      })
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

  it('should return fail on using space as password on /api/v1/auth/login POST', (done) => {
  
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi@gmail.com', password: ' ',
      })
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

  it('should return fail on bad email format without email toplevel domain on /api/v1/auth/login POST', (done) => {
    
    
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi@', password: '123456',
      })
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

  it('should return fail on bad email format without @character  on /api/v1/auth/login POST', (done) => {
    
    
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi', password: '123456',
      })
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

  it('should return fail on bad email format without a complete toplevel domain  on /api/v1/auth/login POST', (done) => {
    
    
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi', password: '123456',
      })
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

  it('should return fail on empty password on /api/v1/auth/login POST', (done) => {
    
    
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'yomi@gmail.com', password: '',
      })
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

  it('should return fail on empty email on /api/v1/auth/login POST', (done) => {
    
    
    chai.request(app)
      .post('/api/v1/auth/login')
      .send({
        email: '', password: '123456',
      })
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

