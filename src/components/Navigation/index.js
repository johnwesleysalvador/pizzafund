import React, {PureComponent} from 'react'
import {withRouter} from 'react-router-dom'

import MenuItem from 'material-ui/MenuItem'
import Drawer from 'material-ui/Drawer'

class Navigation extends PureComponent {
    render() {
        return (
            <div className={this.props.className}>
                <Drawer open={true}>
                    <MenuItem onClick={() => this.props.history.push('/')}>
                        Twitter Analytics
                    </MenuItem>
                    <MenuItem onClick={() => this.props.history.push('/stats')}>
                        Twitter Statistics Chart
                    </MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default withRouter(Navigation)
