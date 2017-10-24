const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config')

module.exports = {
    devtool: 'eval-source-map',

    entry: [
        'webpack-hot-middleware/client?reload=true',
        ...webpackConfig.entry
    ],

    output: webpackConfig.output,

    resolve: webpackConfig.commonResolves,

    plugins: [new webpack.HotModuleReplacementPlugin()],

    module: {
        loaders: webpackConfig.commonLoaders
    }
}
