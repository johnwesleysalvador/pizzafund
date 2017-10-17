const webpack = require('webpack')
const path = require('path')

module.exports = {
    devtool: 'eval-source-map',

    entry: [
        'babel-polyfill',
        'webpack-hot-middleware/client?reload=true',
        './src/index.js'
    ],

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '..', 'dist', 'public'),
        publicPath: '/dist/'
    },

    resolve: {
        modules: ['node_modules', path.join(__dirname, '..', 'src')],
        extensions: ['.js']
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    module: {
        loaders: [
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
}
