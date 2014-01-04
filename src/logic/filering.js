var _ = require('underscore');
var traverse = require('traverse');

function createPredicate(predicate, expectedValue) {
  switch(predicate) {
    case 'equals': return function(actualValue) { return expectedValue == actualValue}; break;
    case 'contains': return function(actualValue) {
      return actualValue == null ? false : actualValue.toLowerCase().indexOf(expectedValue.toLowerCase()) > -1;
    }; break;
    default: throw new Error('Predicate ' + predicate + ' is not supported');
  }
}

function Condition(config) {

  this.field = config.field;

  this.predicate = createPredicate(config.predicate, config.value);

  this.evaluate = function(payload) {
    var actualValue = traverse(payload).get(this.field)
    return this.predicate(actualValue)
  }
}

function compile(conditions) {
  return conditions.map(function(condition) { new Condition(condition)})
  return conditions;
}

var FiltersChain = function (conditions) {

  this.conditions = compile(conditions);

  this.match = function (payload) {
    return this.conditions.reduce(function (match, condition) {
       return match || condition.evaluate(payload);
    }, false)
  }
}

module.exports.FiltersChain = FiltersChain;