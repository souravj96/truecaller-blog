import React from 'react'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons'

import { callPosts } from '../../Action'

// Components
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'
import { SCard, SMeta } from '../../ant_storybook/src/Components/Card'
import { SAvatar } from '../../ant_storybook/src/Components/Avatar'
import { STag } from '../../ant_storybook/src/Components/Tag'

import './style.css'

class LandingPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.handleNextPosts(this.props.state.TruecallerReducer.lastPostCount)
    }

    handleNextPosts = (lastPostCount) => {
        console.log("NOW: ", lastPostCount)
        if (this.props.state.TruecallerReducer.allPosts && (this.props.state.TruecallerReducer.allPosts.length < lastPostCount + 25) && this.props.state.TruecallerReducer.allPosts.length < this.props.state.TruecallerReducer.totalPost) {
            this.props.callPosts(!this.props.state.TruecallerReducer.nextPage ? "page=1" : "page=" + this.props.state.TruecallerReducer.nextPage)
        }
    }

    generateCardDescription = (post) => {
        return (
            <div>
                {ReactHtmlParser(post.excerpt)}
                <UserOutlined />
                <a href="#"> {post.author.name}</a>
                -
                <ClockCircleOutlined />
                {moment().diff(moment(post.date), 'days') > 6 ? moment(post.date).format('ll') : moment(post.date).fromNow()}
                <br />
                {
                    Object.keys(post.tags).map((tag) => <span className="custom-tag">{tag}</span>)
                }
            </div>
        )
    }

    render() {
        console.log("PROPS: ", this.props)
        // if (this.props.state.TruecallerReducer.type === "RECEIVE_POSTS_FROM_SERVER")
        //     this.handleNextPosts(this.state.lastPostCount)
        return (
            <SRow>
                <SCol span={18}>
                    <p>Welcome</p>
                    <SRow>
                        {
                            !this.props.state.TruecallerReducer.allPosts ?
                                null :
                                this.props.state.TruecallerReducer.allPosts.map((post, index) =>
                                    // this.props.state.TruecallerReducer.lastPostCount <= index && index < this.props.state.TruecallerReducer.lastPostCount + 25 ?
                                    <SCol span={16} offset={5}>
                                        <SCard
                                            cover={
                                                <img
                                                    alt="example"
                                                    src={post.post_thumbnail.URL}
                                                />
                                            }
                                        >
                                            {
                                                Object.keys(post.categories).map((tag) =>
                                                    <STag color="blue">{tag}</STag>
                                                )
                                            }
                                            <SMeta
                                                avatar={<SAvatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{post.author.name.slice(0, 1)}</SAvatar>}
                                                title={post.title}
                                                description={this.generateCardDescription(post)}
                                            />
                                        </SCard>
                                    </SCol>
                                    // : null
                                )
                        }
                    </SRow>
                    <button onClick={() => this.handleNextPosts(this.props.state.TruecallerReducer.lastPostCount)}>NEXT</button>
                </SCol>
                <SCol span={6}>
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