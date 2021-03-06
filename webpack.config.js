const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './client/src/Index.jsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  watch: true,
  plugins: [
  ]
};