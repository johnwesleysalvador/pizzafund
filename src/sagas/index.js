import {
    all,
    put,
    fork,
    call,
    select,
    takeEvery,
    takeLatest
} from 'redux-saga/effects'

import * as twitterTypes from '../ducks/twitter'
import {loginToTwitter, getTweets} from './twitter'

function* initialLoadSaga() {
    yield put({type: twitterTypes.AUTHENTICATE_TWITTER_APP})
}

export default function* rootSaga() {
    console.log(twitterTypes.AUTHENTICATE_TWITTER_APP)
    yield all([
        fork(initialLoadSaga),
        takeEvery(twitterTypes.AUTHENTICATE_TWITTER_APP, loginToTwitter),
        takeEvery(twitterTypes.GET_TWEETS, getTweets)
    ])
}
