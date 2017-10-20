import {call, put, select, takeEvery} from 'redux-saga/effects'
import * as twitterTypes from '../ducks/twitter'
import axios from 'axios'

// import {getRewardsActionsResource} from './selectors'

export function* loginToTwitter() {
    const CONSUMER_KEY =
        'ljrAmYZTfi05SHUeU1b2Dq5TY:bxiZNQ91VNQIYbkVl12TVmBAAT3PYxAIcKYibsDA2MJJtk6E8d'

    const encodedConsumeryKey = new Buffer(CONSUMER_KEY).toString('base64')

    try {
        // const response = yield call(
        //     axios.post,
        //     'https://api.twitter.com/oauth2/token',
        //     {
        //         headers: {
        //             Authorization: `Basic ${encodedConsumeryKey}`,
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         }
        //     }
        // )
        const response = yield call(axios.get, '/twitter/timeline')

        yield put({
            type: twitterTypes.AUTHENTICATE_TWITTER_APP_SUCCESS,
            payload: response.data
        })
    } catch (error) {
        yield put({
            type: twitterTypes.AUTHENTICATE_TWITTER_APP_FAIL,
            error
        })
    }
}

function* getTweetFor(screenName) {
    try {
        const response = yield call(
            axios.get,
            '/twitter/timeline/' + screenName
        )

        yield put({
            type: twitterTypes.GET_TWEETS_SUCCESS,
            payload: {name: screenName, data: response.data}
        })
    } catch (error) {
        yield put({
            type: twitterTypes.GET_TWEETS_FAIL,
            error
        })
    }
}

export function* getTweets() {
    yield call(getTweetFor, 'golemproject')
    yield call(getTweetFor, 'Monetha_io')
    yield call(getTweetFor, 'NeblioTeam')
    yield call(getTweetFor, 'SubstratumNet')
    yield call(getTweetFor, 'NEO_Blockchain')
}

// export default [
//     takeEvery(twitterTypes.AUTHENTICATE_TWITTER_APP, loginToTwitter)
// ]
