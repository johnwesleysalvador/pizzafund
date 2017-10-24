const path = require('path')
const fs = require('fs')

var externalNodeModules = fs
    .readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1
    })
    .reduce(function(acc, cur) {
        acc[cur] = 'commonjs ' + cur
        return acc
    }, {})

module.exports = {
    externalModules: externalNodeModules,

    entry: ['babel-polyfill', './src/index.js'],

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '..', 'dist', 'public'),
        publicPath: '/dist/'
    },

    commonResolves: {
        modules: ['node_modules', path.join(__dirname, '..', 'src')],
        extensions: ['.js', '.jsx']
    },

    commonLoaders: [
        {
            test: /\.js?$|\.jsx?$/,
            loader: 'babel-loader',
            include: path.join(__dirname, '..', 'src'),
            query: {
                presets: ['es2015', 'react', 'stage-2'],
                env: {
                    development: {
                        presets: ['react-hmre']
                    }
                }
            }
        }
    ]
}
