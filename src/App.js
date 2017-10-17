import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import {getTweets} from './ducks/twitter'

class App extends PureComponent {
    componentWillMount() {
        this.props.getTweets()
    }

    render() {
        console.log(this.props.tweets)
        return (
            <div>
                <TextField hintText="Tweeter username" />
                <FlatButton label="Add" primary={true} />
                <br />
            </div>
        )
    }
}

const mapStateToProps = ({twitter}) => ({
    tweets: twitter.all
})

export default connect(mapStateToProps, {getTweets})(App)
