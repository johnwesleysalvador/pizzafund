const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const externalModules = webpackConfig.externalModules;

const APP_CONTEXT = path.resolve(__dirname, '..', 'src');

module.exports = [
  {
    devtool: 'source-map',
    
    entry: webpackConfig.entry,

    output: webpackConfig.output,

    resolve: webpackConfig.commonResolves,

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      })
    ],

    module: {
      loaders: webpackConfig.commonLoaders
    }
  }];