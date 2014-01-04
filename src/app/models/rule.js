/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Rule Schema
 */
var RuleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true
  },
  repository: {
    type: String,
    default: '',
    trim: true
  },
  conditions: {
    type: Schema.Types.Mixed
  },
  action: {
    type: Schema.Types.Mixed
  }

});

RuleSchema.path('name').validate(function (name) {
  return name.length;
}, 'Name cannot be blank');

RuleSchema.path('repository').validate(function (name) {
  return name.length;
}, 'Repository cannot be blank');

mongoose.model('Rule', RuleSchema);