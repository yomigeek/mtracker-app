import { describe, it, before, after } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const should = chai.should();

chai.use(chaiHttp);

// Test user signup API/functions
describe('User Accounts API Tests', () => {
  it('should create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: 'yomi@gmail.com', password: '123456', department: 'technology',
      })
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

  it('should check if user account exist with the same email on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: 'yomi@gmail.com', password: '123456', department: 'technology',
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

  it('should return fail on empty fullname on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: '', email: 'yomi@gmail.com', password: '123456', department: 'tech',
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

  it('should return fail on fullname less than two characters on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'y', email: 'yomi@gmail.com', password: '123456', department: 'tech',
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

  it('should return fail on fullname conatining sepecial characters on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi $', email: 'yomi@gmail.com', password: '123456', department: 'tech',
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

  it('should return fail on email empty on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: '', password: '123456', department: 'tech',
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

  it('should return fail on bad email format on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: 'user@', password: '123456', department: 'tech',
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

  it('should return fail on empty department on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi olaoye', email: 'yomi@gmail.com', password: '123456', department: '',
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

  it('should return fail on department less than 2 characters on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'yomi olaoye', email: 'yomi@gmail.com', password: '123456', department: 'T',
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

  it('should return fail on department conatining sepecial characters on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: 'yomi@gmail.com', password: '123456', department: 'tech$',
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

  it('should return fail on password empty on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: 'yomi@gmail.com', password: ' ', department: 'technology',
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

  it('should return fail on password less than 5 characters on create a user account on /api/v1/auth/signup POST', (done) => {
    before(() => console.log('Testing started'));
    after(() => console.log('Testing finished!'));
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        fullname: 'Yomi Olaoye', email: 'yomi@gmail.com', password: '1234', department: 'technology',
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

