import {createAction, createReducer} from './utils'

export const GET_TWEETS = 'twitter/GET_TWEETS'
export const GET_TWEETS_SUCCESS = 'twitter/GET_TWEETS_SUCCESS'
export const GET_TWEETS_FAIL = 'twitter/GET_TWEETS_FAIL'
export const AUTHENTICATE_TWITTER_APP = 'twitter/AUTHENTICATE_TWITTER_APP'
export const AUTHENTICATE_TWITTER_APP_SUCCESS =
    'twitter/AUTHENTICATE_TWITTER_APP_SUCCESS'
export const AUTHENTICATE_TWITTER_APP_FAIL =
    'twitter/AUTHENTICATE_TWITTER_APP_FAIL'

export const getTweets = createAction(GET_TWEETS, 'payload')
export const authenticateTwitterApi = createAction(AUTHENTICATE_TWITTER_APP)

const initialState = {all: [], accessToken: ''}

export default createReducer(initialState, {
    [AUTHENTICATE_TWITTER_APP_SUCCESS](state, action) {
        return {...state, accessToken: action.payload}
    },
    [GET_TWEETS_SUCCESS](state, action) {
        return {...state, all: action.payload}
    }
})
