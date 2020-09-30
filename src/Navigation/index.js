import React from 'react'
import { Switch, Route } from "react-router-dom";

import LandingPage from '../Screen/LandingPage'

class Navigation extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={LandingPage} />
            </Switch>
        )
    }
}
export default Navigation