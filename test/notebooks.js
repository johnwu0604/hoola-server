var request = require('supertest')
var app = require('../server')
require('should')

describe('Notebooks API Tests', function () {
  var Cookies
  var noteBookId

  it('login into a user session', function (done) {
    request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .send({'email': 'john@smith.ca', 'password': 'password'})
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              Cookies = res.headers['set-cookie'].pop().split(';')[0]
              done()
            })
  })

  it('retrieve notebook for the user', function (done) {
    var req = request(app).get('/notebook')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.notebook.text.should.equal('A notebook to keep track of notes')
              noteBookId = res.body.notebook.notebook_id
              done()
            })
  })

  it('updates the notebook', function (done) {
    var req = request(app).put('/notebook/' + noteBookId)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'text': 'A notebook to keep track of notes updated'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.notebook.text.should.equal('A notebook to keep track of notes updated')
              done()
            })
  })

  it('Reverts updates to the notebook', function (done) {
    var req = request(app).put('/notebook/' + noteBookId)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'text': 'A notebook to keep track of notes'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.notebook.text.should.equal('A notebook to keep track of notes')
              done()
            })
  })
})
