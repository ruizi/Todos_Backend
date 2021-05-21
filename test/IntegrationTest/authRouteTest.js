const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGE2YmQ1OTU4OTgxODA0YTJiNjNhYmMiLCJpYXQiOjE2MjE1NDk3MjMsImV4cCI6MTYyMTkwOTcyM30.XEQqv07IOyyHTGodRpTVCC083vMz1AOMzmnC6_qAXM4';


describe('Testing auth routes', () => {

    it('should auth successfully', function (done) {
        chai.request("http://localhost:5000")
            .post('/api/auth/')
            .send({email: 'rui.cai2020@gmail.com', password: '123456'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).token).not.to.be.null;
                done()
            })
    });
})
