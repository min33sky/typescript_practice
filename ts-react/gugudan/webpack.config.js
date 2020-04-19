const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // production
  devtool: 'eval', // hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  entry: {
    app: './client',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },

  plugins: [],

  output: {
    filename: '[name].js', // app.js
    path: path.join(__dirname, 'dist'),
  },
};
