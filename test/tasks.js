/* eslint-env mocha */
process.env.DB_HOST = ''
process.env.DB_PORT = ''
process.env.DB_USER = ''
process.env.DB_PASS = ''
process.env.DB_NAME = ''

var request = require('supertest')
var app = require('../server')
require('should')

describe('Task API Tests', function () {
  var Cookies
  var newTaskId

  it('login into a user session', function (done) {
    request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({'email': 'john@smith.ca', 'password': 'password'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              Cookies = res.headers['set-cookie'].pop().split(';')[0]
              done()
            })
  })

  it('retrieve all tasks for the user', function (done) {
    var req = request(app).get('/tasks')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.tasks.length.should.equal(1)
              done()
            })
  })

  it('adds a task for the user', function (done) {
    var req = request(app).post('/task')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'description': 'Another task', 'due_date': '2017-10-08'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              newTaskId = res.body.tasks[0].task_id
              res.body.user_authenticated.should.equal(true)
              res.body.tasks.length.should.equal(2)
              done()
            })
  })

  it('updates the newly added task', function (done) {
    var req = request(app).put('/task/' + newTaskId)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'description': 'Updated task', 'due_date': '2017-10-08'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.tasks.length.should.equal(2)
              done()
            })
  })

  it('deletes the newly added task', function (done) {
    var req = request(app).delete('/task/' + newTaskId)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.tasks.length.should.equal(1)
              done()
            })
  })
})
