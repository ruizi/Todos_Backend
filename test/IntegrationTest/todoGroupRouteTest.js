const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGE2ZmI4NjAyMzY4ZjBiZjFhMzIzNzUiLCJpYXQiOjE2MjE1NjY5MzIsImV4cCI6MTYyMTkyNjkzMn0.EkKuJ2O7qUc5avZvQiFKbrZZdnBxIuiPjSV8lTP8XPg';


describe('Testing todoGroup routes', () => {

    let newGroup = {
        "todoList": [],
        "_id": "60a725ef0663b4140ea6ba09",
        "owner": "60a6fb8602368f0bf1a32375",
        "groupName": "A new Group for update",
    }

    it('should get all to do groups', function (done) {
        chai.request("http://localhost:5000")
            .get('/api/group/')
            .set('x-auth-token', jwtToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).todoGroups).not.to.be.null;
                done()
            })
    });


    it('should create a new todo group', function (done) {
        chai.request("http://localhost:5000")
            .post('/api/group/')
            .set('x-auth-token', jwtToken)
            .send({groupName: 'A new Group for update'})
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).todoGroup).not.to.be.null;
                newGroup = JSON.parse(res.res.text).todoGroup
                console.log(newGroup)
                done()
            })
    });

    newGroup.groupName = 'A new Group name'

    it('should update a new todo group', function (done) {
        chai.request("http://localhost:5000")
            .put('/api/group/')
            .set('x-auth-token', jwtToken)
            .send(newGroup)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).updatedTodoGroup).not.to.be.null;
                done()
            })
    });

    it('should delete a new todo group', function (done) {
        chai.request("http://localhost:5000")
            .delete(`/api/group/${newGroup._id}`)
            .set('x-auth-token', jwtToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).updatedUser).not.to.be.null;
                done();
            })
    });
})
