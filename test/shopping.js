var request = require('supertest')
var app = require('../server')
require('should')

describe('Shopping API Tests', function () {
  var Cookies
  var newShoppingItemId

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

  it('retrieve all shopping items for the user', function (done) {
    var req = request(app).get('/shopping-list-items')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.items.length.should.equal(1)
              done()
            })
  })

  it('adds a shopping item to the user', function (done) {
    var req = request(app).post('/shopping-list-item')
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'description': 'Another shopping item'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              newShoppingItemId = res.body.items[0].item_id
              res.body.user_authenticated.should.equal(true)
              res.body.items.length.should.equal(2)
              done()
            })
  })

  it('updates the newly added shopping list item', function (done) {
    var req = request(app).put('/shopping-list-item/' + newShoppingItemId)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .send({'description': 'Updated shopping item'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.items.length.should.equal(2)
              done()
            })
  })

  it('deletes the newly added shopping list item', function (done) {
    var req = request(app).delete('/shopping-list-item/' + newShoppingItemId)
    req.cookies = Cookies
    req.set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
              if (err) { console.log(err) }
              res.body.user_authenticated.should.equal(true)
              res.body.items.length.should.equal(1)
              done()
            })
  })
})
