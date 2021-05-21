const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGE2ZmI4NjAyMzY4ZjBiZjFhMzIzNzUiLCJpYXQiOjE2MjE1NjY5MzIsImV4cCI6MTYyMTkyNjkzMn0.EkKuJ2O7qUc5avZvQiFKbrZZdnBxIuiPjSV8lTP8XPg';


describe('Testing todoItem routes', () => {

    let newTodoItem = {
        subTitle: '',
        description: '',
        isFinished: false,
        repeatCircle: 'Once',
        _id: '60a727f60663b4140ea6ba20',
        creator: '60a6fb8602368f0bf1a32375',
        group: '60a715854eba6f109e1db8a1',
        title: 'Hello World',
        createAt: '2021-05-21T02:43:00.051Z',
        scheduleAt: '2021-05-21T02:43:00.019Z',
        __v: 0
    }


    it('should get all to do items', function (done) {
        chai.request("http://localhost:5000")
            .get('/api/todo/')
            .set('x-auth-token', jwtToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).todoItems).not.to.be.null;
                done()
            })
    });

    it('should create a new todo Item', function (done) {
        chai.request("http://localhost:5000")
            .post('/api/todo/')
            .set('x-auth-token', jwtToken)
            .send({
                title: 'Hello World',
                scheduleAt: new Date().toISOString().toString(),
                groupId: '60a715854eba6f109e1db8a1'
            })
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).newTodoItem).not.to.be.null;
                newTodoItem = JSON.parse(res.res.text).newTodoItem;
                done()
            })
    });

    it('should update a new todo Item',  function (done) {
        chai.request("http://localhost:5000")
            .put('/api/todo/')
            .set('x-auth-token', jwtToken)
            .send(newTodoItem)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).updatedTodoItem).not.to.be.null;
                done()
            })
    });

    it('should delete a new todo Item',  function (done) {
        chai.request("http://localhost:5000")
            .delete('/api/todo/' + newTodoItem._id)
            .set('x-auth-token', jwtToken)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(JSON.parse(res.res.text).message).equal('TodoItem delete successfully')
                done()
            })
    });
})
