import React from 'react'
import { connect } from 'react-redux'

import { callPosts } from '../../Action'

// Components
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'

class LandingPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.callPosts()
    }

    render() {
        console.log("PROPS: ", this.props)
        return (
            <SRow>
                <SCol span={12}>
                    <p>Welcome</p>
                </SCol>
                <SCol span={12}>
                    <p>Welcome</p>
                </SCol>
            </SRow>

        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        state,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        callPosts: (data) => {
            return dispatch(callPosts(data))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)