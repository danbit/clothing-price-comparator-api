const path = require('path');

module.exports = {
  entry: [
    'regenerator-runtime/runtime',
    './src/index.js'
  ],
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        test: /\.js$/,
      },
      {
        use: {
          loader: '@sucrase/webpack-loader',
          options: {
            transforms: ['jsx']
          }
        },
        exclude: /(node_modules)/,
        test: /\.js$/
      }
    ]
  }
}
