import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table'

import {getTweets} from './ducks/twitter'

class App extends PureComponent {
    componentWillMount() {
        this.props.getTweets()
    }

    renderStatsForTweeter = tweets => {
        if (!tweets) return null

        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>Screen name</TableHeaderColumn>
                        <TableHeaderColumn>Tweets</TableHeaderColumn>
                        <TableHeaderColumn>Likes</TableHeaderColumn>
                        <TableHeaderColumn>Retweets</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tweets.map(tweet => {
                        return (
                            <TableRow>
                                <TableRowColumn>
                                    {tweet.user.name}
                                </TableRowColumn>
                                <TableRowColumn>1</TableRowColumn>
                                <TableRowColumn>
                                    {tweet.favorite_count}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {tweet.retweet_count}
                                </TableRowColumn>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }

    render() {
        return (
            <div>
                {this.renderStatsForTweeter(this.props.golem)}
                {this.renderStatsForTweeter(this.props.monetha)}
                {this.renderStatsForTweeter(this.props.neblio)}
                {this.renderStatsForTweeter(this.props.substratum)}
                {this.renderStatsForTweeter(this.props.neo)}
            </div>
        )
    }
}

const mapStateToProps = ({
    twitter: {
        golemproject,
        Monetha_io,
        NeblioTeam,
        SubstratumNet,
        NEO_Blockchain
    }
}) => ({
    golem: golemproject,
    monetha: Monetha_io,
    neblio: NeblioTeam,
    substratum: SubstratumNet,
    neo: NEO_Blockchain
})

export default connect(mapStateToProps, {getTweets})(App)
