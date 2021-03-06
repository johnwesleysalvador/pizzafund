import React, {Component} from 'react'
import styled from 'styled-components'
import moment from 'moment'
import {connect} from 'react-redux'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table'
import {Route, Redirect} from 'react-router-dom'

import StatsChart from '../StatsChart'
import {getTweets} from '../../ducks/twitter'

const Wrapper = styled.div`margin-bottom: 50px;`

const sum = (items, prop) => {
    return items.reduce(function(a, b) {
        return b[prop] === null || b[prop].retweeted_status ? a : a + b[prop]
    }, 0)
}

class TwitterList extends Component {
    componentWillMount() {
        this.props.getTweets({
            start: moment()
                .subtract(1, 'days')
                .format('YYYY-MM-DD'),
            end: moment().format('YYYY-MM-DD')
        })
    }

    renderStatsForTweeter = (tweets, name) => {
        const retweetCount = sum(tweets, 'retweet_count')
        const likesCount = sum(tweets, 'favorite_count')
        const total = tweets.length * 3 + retweetCount * 3 + likesCount * 2
        const style =
            total > 0
                ? {background: '#455A64', color: '#ffffff'}
                : {background: '#CFD8DC', color: '#000000'}
        return (
            <Wrapper>
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn
                            >{`${name} statistics`}</TableHeaderColumn>
                            <TableHeaderColumn>
                                Importance factor
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Number of times variable
                            </TableHeaderColumn>
                            <TableHeaderColumn>
                                Total importance multiplied by variables
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>
                                Statistics for tweet
                            </TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>{tweets.length}</TableRowColumn>
                            <TableRowColumn>{tweets.length * 3}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                Statistics for retweets
                            </TableRowColumn>
                            <TableRowColumn>3</TableRowColumn>
                            <TableRowColumn>{retweetCount}</TableRowColumn>
                            <TableRowColumn>{retweetCount * 3}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>
                                Statistics for likes
                            </TableRowColumn>
                            <TableRowColumn>2</TableRowColumn>
                            <TableRowColumn>{likesCount}</TableRowColumn>
                            <TableRowColumn>{likesCount * 2}</TableRowColumn>
                        </TableRow>
                        <TableRow style={style}>
                            <TableRowColumn>Total</TableRowColumn>
                            <TableRowColumn />
                            <TableRowColumn />
                            <TableRowColumn>{total}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Wrapper>
        )
    }

    render() {
        return (
            <div>
                {this.renderStatsForTweeter(this.props.golem, 'golemproject')}
                {this.renderStatsForTweeter(this.props.monetha, 'Monetha_io')}
                {this.renderStatsForTweeter(this.props.neblio, 'NeblioTeam')}
                {this.renderStatsForTweeter(
                    this.props.substratum,
                    'SubstratumNet'
                )}
                {this.renderStatsForTweeter(this.props.neo, 'NEO_Blockchain')}
                {this.renderStatsForTweeter(this.props.omiseGo, 'omiseGo')}
            </div>
        )
    }
}

const mapStateToProps = ({
    twitter: {
        accounts: {
            golemproject,
            Monetha_io,
            NeblioTeam,
            SubstratumNet,
            NEO_Blockchain,
            omise_go
        }
    }
}) => ({
    golem: golemproject,
    monetha: Monetha_io,
    neblio: NeblioTeam,
    substratum: SubstratumNet,
    neo: NEO_Blockchain,
    omiseGo: omise_go
})

export default connect(mapStateToProps, {getTweets})(TwitterList)
