var chai = require('chai'),
    expect = chai.expect,
    chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('travis endpoint tests', function() {

  describe('#hook', function() {

    it('should return HTTP 200', function(done) {
      var payload = {repository: { url: "https://github.com/shaharke/travis-hooker.git" }};

      chai.request("http://localhost:3001")
        .post('/travis/hook')
        .req(function (req) {
          req.send('payload=' + JSON.stringify(payload))
          req.set('content-type', 'application/x-www-form-urlencoded');
        })
        .res(function (res) {
          expect(res).to.have.status(200);
          done()
        });
    })
  })
})
