var mongoose = require('mongoose'),
    Rule = mongoose.model('Rule'),
    FiltersChain = require('../../logic/filtering').FiltersChain;


module.exports.hook = function (config) {

  return function(req, res) {

    var payload = JSON.parse(req.body.payload);
    console.log(payload)

    var rulePromise = Rule.findOne().where('repository').equals(payload.repository.url).exec();
    rulePromise.then(function(rule) {
      if (rule) {
        var filtersChain = new FiltersChain(rule.conditions);
        if (filtersChain.match(payload)) {
          try {
            var action = require(config.root + '/logic/actions/' + rule.action.plugin);
            action.call(rule.action.config, payload, {info: console.log, error: console.error});
          } catch (e) {
            throw new Error('Failed to load action ' + rule.action + '. Reason: ' + e.message);
          }
        }
      }

    }, function(err) {

    })

    res.send(200);

  }

}

