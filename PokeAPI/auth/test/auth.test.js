const usersController = require('../users.controller');
let user1 = {userName: 'Auth1', password: '1111'};
usersController.addUser(user1.userName, user1.password);

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app').app;
chai.use(chaiHttp);

describe('Authentication testing', () => {
    it ('Should return 401 when no JWT token available', (done) => {
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it ('Should return 400 when no login data is provided', (done) => {
        //let user = {userName: 'Antonio', password: '4815'};
        chai.request(app)
            .post('/auth/login')
            /*.set('Content-Type', 'application/json')
            .send(user)*/
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });
    it ('Should return 200 and token for successful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });
    it ('Should return 200 when JWT token is valid', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user1)
            .end((err, res) => {
                let token = res.body.token;
                chai.request(app)
                    .get('/team')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
    it ('Should return 401 when token does not correspond to a registered user', (done) => {
        let user = {userName: 'Antonio', password: '4815'};
        chai.request(app)
            .post('/auth/login')
            .set('Content-Type', 'application/json')
            .send(user)
            .end((err, res) => {
                //let token = res.body.token;
                let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkludHJ1c28iLCJwYXNzd29yZCI6Ijk4NzYiLCJpYXQiOjE1MTYyMzkwMjJ9.XLkIRfUs66cIa4SdQO7BLVFOjk9QyIq_2DzabyHiRQ0';
                chai.request(app)
                    .get('/team')
                    .set('Authorization', `JWT ${token}`)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 401);
                        done();
                    });
            });
    });
});


