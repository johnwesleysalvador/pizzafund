import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import ApplyTheme from 'utils/themes'

import configureStore from 'store/configureStore'
import App from './App'

const store = configureStore()

render(
    <Provider store={store}>
        <ApplyTheme>
            <App />
        </ApplyTheme>
    </Provider>,
    document.getElementById('app')
)
