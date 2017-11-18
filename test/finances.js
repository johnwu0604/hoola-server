var request = require('supertest')
var app = require('../server')
require('should')

describe('Finance API Tests', function () {
  var Cookies
  var newFinanceItem

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

  it('retrieve all finances for the user', function (done) {
    var req = request(app).get('/finances')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.finances.types.length.should.equal(4)
              res.body.finances.categories.length.should.equal(9)
              res.body.finances.items.length.should.equal(1)
              done()
            })
  })

  it('adds a finance item for the user', function (done) {
    var req = request(app).post('/finance')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'type_id': '1', 'category_id': '1', 'date': '2017-10-09', 'description': 'Another item', 'amount': '4.99'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              newFinanceItem = res.body.items[0].item_id
              res.body.user_authenticated.should.equal(true)
              res.body.items.length.should.equal(2)
              done()
            })
  })

  it('deletes the newly finance item', function (done) {
    var req = request(app).delete('/finance/' + newFinanceItem)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              console.log(res)
              res.body.user_authenticated.should.equal(true)
              res.body.items.length.should.equal(1)
              done()
            })
  })
})
