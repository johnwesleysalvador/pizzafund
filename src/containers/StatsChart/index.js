import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts'
import {Route} from 'react-router-dom'
import moment from 'moment'

import {getTweets} from '../../ducks/twitter'
import {statsCount} from '../../utils/helper'

const Wrapper = styled.div`
    display: flex;
    width: 1280px;
    height: 700px;
`

const colors = [
    '#F44336',
    '#9C27B0',
    '#673AB7',
    '#2196F3',
    '#03A9F4',
    '#009688',
    '#4CAF50'
]

class StatsChart extends Component {
    render() {
        const {twitter} = this.props

        let analysis = []
        for (let i = 0; i < 48; i++) {
            const timeToSubtract = i + 1
            const timeFrom = moment()
                .clone()
                .subtract(timeToSubtract, 'hours')
            const timeTo = moment()
                .clone()
                .subtract(i, 'hours')
            const cryptoData = Object.keys(twitter).map(user => {
                const feeds = twitter[user]
                const feedsAtTime = feeds.filter(feed => {
                    const created = moment(feed.created_at)
                    return (
                        created.isSameOrAfter(timeFrom) &&
                        created.isSameOrBefore(timeTo)
                    )
                })
                const stats =
                    feedsAtTime.length > 0
                        ? feedsAtTime.length +
                          statsCount(feedsAtTime, 'retweet_count') +
                          statsCount(feedsAtTime, 'favorite_count')
                        : 0
                return {
                    name: user,
                    stats
                }
            })
            let map = {}
            cryptoData.forEach(m => {
                map[m.name] = m.stats
            })
            analysis.push({
                name: 'Hour ' + timeToSubtract,
                ...map
            })
        }

        return (
            <Wrapper>
                <ResponsiveContainer>
                    <LineChart
                        data={analysis}
                        margin={{top: 5, right: 30, left: 20, bottom: 5}}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />

                        {Object.keys(twitter).map((name, index) => {
                            return (
                                <Line
                                    type="monotone"
                                    dataKey={name}
                                    stroke={colors[index]}
                                />
                            )
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </Wrapper>
        )
    }
}

const mapStateToProps = ({twitter}) => ({
    twitter
})

export default connect(mapStateToProps)(StatsChart)
