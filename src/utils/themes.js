import React from 'react'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
    blue700,
    blue900,
    grey400,
    yellow500,
    grey100,
    grey500
} from 'material-ui/styles/colors'

injectTapEventPlugin()

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue700,
        primary2Color: blue900,
        primary3Color: grey400,
        accent1Color: yellow500,
        accent2Color: grey100,
        accent3Color: grey500
    }
})

const ApplyTheme = ({children}) => (
    <MuiThemeProvider muiTheme={muiTheme}>{children}</MuiThemeProvider>
)

ApplyTheme.propTypes = {
    children: PropTypes.object.isRequired
}

export default ApplyTheme
