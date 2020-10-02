import React from 'react'
import { Switch, Route } from "react-router-dom";

import LandingPage from '../Screen/LandingPage'
import SingleBlog from '../Screen/SingleBlog'

class Navigation extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/solo/:id' component={SingleBlog} />
                <Route path='/:id' component={LandingPage} />
                <Route path='/' component={LandingPage} />
            </Switch>
        )
    }
}
export default Navigation