const express = require('express')
const webpack = require('webpack')
const path = require('path')
const Twitter = require('twitter')
const R = require('request')

const NodeCache = require('node-cache')
const myCache = new NodeCache()

const PORT = process.env.PORT || 3001
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    Run: () => {
        const app = express()

        app.use(
            '/dist',
            express.static(path.join(__dirname, '..', 'dist', 'public'))
        )

        if (NODE_ENV === 'development') {
            const webpackDevMiddleware = require('webpack-dev-middleware')
            const webpackHotMiddleware = require('webpack-hot-middleware')

            const webpackDevConfig = require('../webpack/webpack.config.dev')
            const compiler = webpack(webpackDevConfig)

            app.use(
                webpackDevMiddleware(compiler, {
                    publicPath: '/dist/'
                })
            )

            app.use(webpackHotMiddleware(compiler))
        }

        const authenticate = (req, res, next) => {
            const CONSUMER_KEY =
                'ljrAmYZTfi05SHUeU1b2Dq5TY:bxiZNQ91VNQIYbkVl12TVmBAAT3PYxAIcKYibsDA2MJJtk6E8d'

            const encodedConsumeryKey = new Buffer(CONSUMER_KEY).toString(
                'base64'
            )

            myCache.get('access_token', (err, value) => {
                if (!err) {
                    if (!value) {
                        R(
                            {
                                url: 'https://api.twitter.com/oauth2/token',
                                method: 'POST',
                                headers: {
                                    Authorization:
                                        'Basic ' + encodedConsumeryKey,
                                    'Content-Type':
                                        'application/x-www-form-urlencoded;charset=UTF-8'
                                },
                                body: 'grant_type=client_credentials'
                            },
                            function(err, resp, body) {
                                const cacheValue = JSON.parse(body)
                                myCache.set(
                                    'access_token',
                                    cacheValue,
                                    (err, success) => {
                                        if (!err && success) {
                                            console.log(
                                                'twitter',
                                                body,
                                                JSON.parse(body)
                                            )

                                            req.token = cacheValue
                                            next()
                                        }
                                    }
                                )
                            }
                        )
                    } else {
                        req.token = value
                        next()
                    }
                }
            })
        }

        app.get('/twitter/timeline/:name', authenticate, (req, res) => {
            var client = new Twitter({
                consumer_key: 'ljrAmYZTfi05SHUeU1b2Dq5TY',
                consumer_secret:
                    'bxiZNQ91VNQIYbkVl12TVmBAAT3PYxAIcKYibsDA2MJJtk6E8d',
                bearer_token: req.token.access_token
            })

            // var params = { screen_name: req.params.name, count: 50 }
            // client.get('statuses/user_timeline', params, function(
            //     error,
            //     tweets,
            //     response
            // ) {
            //     if (!error) {
            //         return res.send(tweets)
            //     }
            //     return res.send(error)
            // })
            client.get(
                'search/tweets',
                {
                    q:
                        'since:' +
                        req.query.startDate +
                        '+until:' +
                        req.query.endDate +
                        '+from:' +
                        req.params.name
                },
                function(error, tweets, response) {
                    if (error) {
                        return res.send(error)
                    }
                    return res.send(tweets)
                }
            )
        })

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'index.html'))
        })

        app.listen(PORT, () => {
            console.log('-----------------------------')
            console.log(
                `========> LISTENING TO PORT ${PORT} ON '${NODE_ENV}' ENVIRONMENT`
            )
            console.log('-----------------------------')
        })
    }
}
