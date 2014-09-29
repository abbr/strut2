'use strict';

var common = require('./webpack.common.config');

module.exports = {
  output: {
    filename: 'experiment.js'
  },

  cache: true,
  debug: true,
  devtool: false,
  
  resolve: common.resolve,
  entry: common.entry,

  stats: {
    colors: true,
    reasons: true
  },

  module: common.module
};
