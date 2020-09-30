import React from 'react'
import { connect } from 'react-redux'

import { callPosts } from '../../Action'

// Components
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'

class LandingPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lastPostCount: 0,
        }
    }

    componentDidMount() {
        this.handleNextPosts(this.state.lastPostCount)
    }

    handleNextPosts = (lastPostCount) => {
        if (this.props.state.TruecallerReducer.allPosts  && (this.props.state.TruecallerReducer.allPosts.length < lastPostCount + 25) && this.props.state.TruecallerReducer.allPosts.length < this.props.state.TruecallerReducer.totalPost) {
            this.props.callPosts(!this.props.state.TruecallerReducer.nextPage ? "" : this.props.state.TruecallerReducer.nextPage)
        }
    }

    render() {
        console.log("PROPS: ", this.props)
        if (this.props.state.TruecallerReducer.type === "RECEIVE_POSTS_FROM_SERVER")
            this.handleNextPosts(this.state.lastPostCount)
        return (
            <SRow>
                <SCol span={12}>
                    <p>Welcome</p>
                    <ol>
                        {
                            !this.props.state.TruecallerReducer.allPosts ?
                                null :
                                this.props.state.TruecallerReducer.allPosts.map((post, index) =>
                                    this.state.lastPostCount <= index && index < this.state.lastPostCount + 25 ?
                                        <li>{index + " " + post.title}</li>
                                        : null
                                )
                        }
                    </ol>
                </SCol>
                <SCol span={12}>
                    <button onClick={() => this.setState({ lastPostCount: this.state.lastPostCount + 25 })}>NEXT</button>
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