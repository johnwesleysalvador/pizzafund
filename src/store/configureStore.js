import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import createSagaMiddleware from 'redux-saga'
import rootReducer from '../ducks'
import rootSaga from '../sagas'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    )
    sagaMiddleware.run(rootSaga)

    return store
}
