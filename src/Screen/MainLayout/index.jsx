import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { SLayout, SHeader, SContent } from '../../ant_storybook/src/Components/Layout'

import { callPosts } from '../../Action'

class MainLayout extends React.Component {

    handleFirstPost = (data) => {
        if (this.props.setPage) {
            this.props.setPage(1)
        }
        let category = !data.category ? "" : data.category
        let tag = !data.tag ? "" : data.tag
        this.props.callPosts({
            ...data,
            param: "category=" + category + "&tag=" + tag + "&page=1"
        })
        this.props.history.push("/");
    }

    render() {
        return (
            <SLayout>
                <SHeader>
                    <img src="/truecaller-logo-white.png" alt="Truecaller" style={{ width: '120px' }} onClick={() => this.handleFirstPost({ home: true })} />
                </SHeader>
                <SContent style={{ padding: '0 50px' }}>
                    {this.props.children}
                </SContent>
            </SLayout>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout))