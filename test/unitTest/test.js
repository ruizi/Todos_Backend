const assert = require('assert');
//const supertest = require('supertest');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const app = require('../../server');

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDljODllZTQ4MmEzNzlkNzFmY2RmZWEiLCJpYXQiOjE2MjA4NzM2NTYsImV4cCI6MTYyMTIzMzY1Nn0.jNum5ge4Xlh02IA0RUwOgphe67w4nRie62OyJY4ldso'


describe('GET /api/user/profile', () => {

    it('the getting profile of user',  (done) => {
        chai.request(app)
            .get('/api/user/profile')
            .set('x-auth-token', jwtToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/plain');
                expect(res).to.be.json;
                //console.log(res)
                done();
            })
    })
})

// describe('loading express', () => {
//
//     beforeEach(() => {
//
//     })
//     afterEach(() => {
//         // server.close();
//     })
//
//     it('responds to /', () => {
//         const a = request(app)
//             .get('/api/auth')
//             .expect(200, 'API Running');
//         console.log(a)
//     });
// })
