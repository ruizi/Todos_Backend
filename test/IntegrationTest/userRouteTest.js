const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGE2ZmI4NjAyMzY4ZjBiZjFhMzIzNzUiLCJpYXQiOjE2MjE1NjY5MzIsImV4cCI6MTYyMTkyNjkzMn0.EkKuJ2O7qUc5avZvQiFKbrZZdnBxIuiPjSV8lTP8XPg'


describe('Testing user routes', () => {

    it('should get profile of a user', function (done) {
        chai.request("http://localhost:5000")
            .get('/api/user/')
            .set('x-auth-token', jwtToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).profile).not.to.be.null;
                done()
            })
    });

    it('should register a user successfully',  function (done) {
        chai.request("http://localhost:5000")
            .post('/api/user/')
            .send({
                email: 'rui.cai' + new Date().getMilliseconds() + '@outlook.com',
                username: 'testing',
                password: '123456'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).newUserCreated).equal('success')
                done()
            })
    });
})
