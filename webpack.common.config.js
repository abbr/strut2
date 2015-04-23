module.exports = {
  module: {
    preLoaders: [{
      test: '\\.js$',
      exclude: 'node_modules',
      loader: 'jshint'
    }],

    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.gif$/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    },
    { test: /\.js(x?)$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime'},
    { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
    { test: /\.ttf$/,    loader: "file-loader" },
    { test: /\.eot$/,    loader: "file-loader" },
    { test: /\.svg$/,    loader: "file-loader" }]
  },

  resolve: {
    root: __dirname + '/src',
    modulesDirectories: ['scripts', 'styles', 'node_modules']
  },

  entry: './src/scripts/components/<%= pkg.mainInput %>.jsx'
};
