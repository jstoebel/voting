//  Modified from https://github.com/elliotf/mocha-mongoose
let config = require('../config/config');
let mongoose = require('mongoose');
let _ = require('underscore');

// ensure the NODE_ENV is set to 'test'
// this is helpful when you would like to change behavior when testing
process.env.NODE_ENV = 'test';

const clearDB = function() {
  _.each(mongoose.connection.models, function(model, name) {
    model.remove({}, function(err, removed) {
    });
  });
};

beforeEach(function() {
  clearDB();
});

afterEach(function() {
  clearDB();
});
