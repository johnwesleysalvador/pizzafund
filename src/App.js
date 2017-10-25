import React, {PureComponent} from 'react'
import styled from 'styled-components'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import TwitterList from './containers/TwitterList'
import StatsChart from './containers/StatsChart'

import Navigation from 'components/Navigation'

const Wrapper = styled.div`display: flex;`

const NavigationExtended = styled(Navigation)`
    display: flex;
    flex: 0.5;
`

const Main = styled.div`
    display: flex;
    flex: 2;
    margin-left: 256px;
    padding: 20px;
`

class App extends PureComponent {
    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <Main>
                        <Route exact path="/" component={TwitterList} />
                        <Route path={`/stats`} component={StatsChart} />
                    </Main>
                </div>
            </Router>
        )
    }
}

export default App
