const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app').app;

chai.use(chaiHttp);


describe(('End-to-end testing root'), () => {
    it ('The server should be initialized on the specified port', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.text, 'Server response at port 3000');
                done();
            });
    });
    it ('Should return Server started at port 3000', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                chai.assert.equal(res.text, 'Server response at port 3000');
                done();
            });
    });
});