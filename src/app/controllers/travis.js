var mongoose = require('mongoose'),
    Rule = mongoose.model('Rule');


module.exports.hook = function (req, res) {
  var payload = JSON.parse(req.body.payload);
  console.log(payload)

  var rulePromise = Rule.findOne().where('repository').equals(payload.repository.url).exec();
  rulePromise.then(function(rule) {
    res.send(200);
  }, function(err) {
    res.send(500, err);
  })

}

