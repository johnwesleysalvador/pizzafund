import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TwitterList from './containers/TwitterList'
import StatsChart from './containers/StatsChart'

class App extends PureComponent {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={TwitterList} />
                    <Route path={`/stats/:name`} component={StatsChart} />
                </div>
            </Router>
        )
    }
}

export default App
