process.env.DB_HOST='hoola-test.cod6unwponb4.us-west-2.rds.amazonaws.com'
process.env.DB_PORT='4337'
process.env.DB_USER='hoola'
process.env.DB_PASS='hoola123'
process.env.DB_NAME='Hoola_Test'

var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server')
var should = chai.should()

chai.use(chaiHttp)

server.request.isAuthenticated = function() {
    return true
}

describe('Tasks', function() {
    it('should list ALL tasks on /tasks GET', function(done) {
        chai.request(server)
            .get('/tasks')
            .end(function(err, res) {
                res.should.have.status(200)
                done()
            })
    })
})