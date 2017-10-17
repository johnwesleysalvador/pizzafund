import {createStore, applyMiddleware} from 'redux'

import createSagaMiddleware from 'redux-saga'
import rootReducer from '../ducks'
import rootSaga from '../sagas'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware)
    )
    sagaMiddleware.run(rootSaga)

    return store
}
