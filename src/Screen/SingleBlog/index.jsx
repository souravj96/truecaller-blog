import React from 'react'
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

import { UserOutlined, ClockCircleOutlined, ReloadOutlined } from '@ant-design/icons'

import { BackTop, Skeleton } from 'antd'

import { callPost, callCategories, callTags, callPopularPosts, callPostName } from '../../Action'

import MainLayout from '../MainLayout/index'

// Components
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'
import { SCard, SMeta } from '../../ant_storybook/src/Components/Card'
import { SAvatar } from '../../ant_storybook/src/Components/Avatar'
import { STag } from '../../ant_storybook/src/Components/Tag'
import { SList, SListItem, SListItemMeta } from '../../ant_storybook/src/Components/List'
import { SBadge } from '../../ant_storybook/src/Components/Badge'

import './style.css'

class SingleBlog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            postId: !this.props.match.params.id ? "" : this.props.match.params.id
        }
    }

    componentDidMount() {
        this.props.callPost({ param: this.state.postId })
        this.props.callPopularPosts({ param: this.state.postId })
        this.props.callCategories()
        this.props.callTags()
    }

    handleFirstPost = (data) => {
        let category = !data.category ? "" : data.category
        let tag = !data.tag ? "" : data.tag
        this.props.history.push({ pathname: "/", params: { category: category, tag: tag } });
    }

    handlePostName = (post) => {
        this.props.callPostName({ param: post.fields.post_id })
        return null
    }

    handlePopularPostClick = (postId) => {
        this.props.callPost({ param: postId })
        this.props.callPopularPosts({ param: postId })
        this.props.history.push("/solo/" + postId)
    }

    generateCardDescription = (post) => {
        return (
            post.content ?
                <div className="mb-2">
                    {ReactHtmlParser(post.content)}
                    <UserOutlined className="mr-1" />
                    <span className="mr-3 text-primary">{!post.author ? "" : post.author.name}</span>
                    <ClockCircleOutlined className="mr-1" />
                    <span className="text-primary">
                        {moment().diff(moment(post.date), 'days') > 6 ? moment(post.date).format('ll') : moment(post.date).fromNow()}
                    </span>
                    <br /><br />
                    {
                        Object.keys(post.categories).map((tag) =>
                            <STag key={'post' + tag} color="blue" onClick={() => this.handleFirstPost({ category: post.categories[tag].slug })}>{tag}</STag>
                        )
                    }
                    <br /><br />
                    {
                        Object.keys(post.tags).map((tag) => <span key={'post' + tag} className="custom-tag m-1" onClick={() => this.handleFirstPost({ tag: post.tags[tag].slug })}>{tag}</span>)
                    }
                </div>
                : null
        )
    }

    render() {
        return (
            <MainLayout>
                <SRow className="100-vh mx-2 my-3">
                    <BackTop />
                    <SCol span={18}>
                        <SRow>
                            <SCol span={16} offset={5}>
                                {
                                    this.props.state.TruecallerReducer.singlePostLoading ?
                                        <SCard className="mb-3 shadow-sm">
                                            <Skeleton.Image active className="w-100 mb-3" />
                                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                                        </SCard>
                                        :
                                        this.props.state.TruecallerReducer.postError ?
                                            <div className="w-100 mb-3 bg-light d-flex" style={{ height: '120px' }}>
                                                <ReloadOutlined className="align-self-center mx-auto" onClick={() => this.props.callPost({ param: this.state.postId })} />
                                            </div>
                                            :
                                            <SCard
                                                cover={
                                                    <img
                                                        alt="example"
                                                        src={!this.props.state.TruecallerReducer.post.post_thumbnail ? "/placeholder-640x480.jpg" : this.props.state.TruecallerReducer.post.post_thumbnail.URL}
                                                    />
                                                }
                                                className="mb-3 shadow-sm"
                                                // actions={[
                                                //     "Continue Reading →"
                                                // ]}
                                                title={this.props.state.TruecallerReducer.post.title}
                                            >
                                                <SMeta
                                                    avatar={<SAvatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{!this.props.state.TruecallerReducer.post.author ? "" : this.props.state.TruecallerReducer.post.author.name.slice(0, 1)}</SAvatar>}
                                                    description={this.generateCardDescription(this.props.state.TruecallerReducer.post)}
                                                />
                                            </SCard>
                                }
                            </SCol>
                        </SRow>
                    </SCol>
                    <SCol span={6}>
                        <h4 className="text-secondary">POPULAR POST:</h4>
                        <SList bordered className="mb-3">
                            {
                                this.props.state.TruecallerReducer.popularPosts.map((post) =>
                                    !post.fields.title && !this.props.state.TruecallerReducer.postNameLoading ? this.handlePostName(post)
                                        :
                                        <SListItem key={post.fields.post_id} onClick={() => this.handlePopularPostClick(post.fields.post_id)}>
                                            <SListItemMeta
                                                avatar={<SAvatar src={!post.fields.post_thumbnail ? "/placeholder-640x480.jpg" : post.fields.post_thumbnail.URL} />}
                                                title={post.fields.title}
                                            />
                                        </SListItem>
                                )
                            }
                        </SList>
                        <h4 className="text-secondary">CATEGORIES:</h4>
                        <SList bordered className="mb-3">
                            {
                                this.props.state.TruecallerReducer.categoryLoading ?
                                    <SListItem>
                                        <Skeleton active title />
                                    </SListItem>
                                    :
                                    this.props.state.TruecallerReducer.categoriesError ?
                                        <div className="w-100 mb-3 bg-light d-flex" style={{ height: '120px' }}>
                                            <ReloadOutlined className="align-self-center mx-auto" onClick={() => this.props.callCategories()} />
                                        </div>
                                        :
                                        this.props.state.TruecallerReducer.categories.map((category) =>
                                            <SListItem key={'side'+category.slug} onClick={() => this.handleFirstPost({ category: category.slug })}>
                                                <SRow className="w-100">
                                                    <SCol span={23}>
                                                        <span>{category.name}</span>
                                                    </SCol>
                                                    <SCol span={1}>
                                                        <SBadge className="float-right" count={category.post_count} />
                                                    </SCol>
                                                </SRow>
                                            </SListItem>
                                        )
                            }
                        </SList>
                        <h4 className="text-secondary">POPULAR TAGS:</h4>
                        <SList bordered className="mb-3">
                            {
                                this.props.state.TruecallerReducer.tagLoading ?
                                    <SListItem>
                                        <Skeleton active title />
                                    </SListItem>
                                    :
                                    this.props.state.TruecallerReducer.tagsError ?
                                        <div className="w-100 mb-3 bg-light d-flex" style={{ height: '120px' }}>
                                            <ReloadOutlined className="align-self-center mx-auto" onClick={() => this.props.callTags()} />
                                        </div>
                                        :
                                        this.props.state.TruecallerReducer.tags.map((tag) =>
                                            <SListItem key={'side'+tag.slug} onClick={() => this.handleFirstPost({ tag: tag.slug })}>
                                                <SRow className="w-100">
                                                    <SCol span={23}>
                                                        <span>{tag.name}</span>
                                                    </SCol>
                                                    <SCol span={1}>
                                                        <SBadge className="float-right" count={tag.post_count} />
                                                    </SCol>
                                                </SRow>
                                            </SListItem>
                                        )
                            }
                        </SList>
                    </SCol>
                </SRow>
            </MainLayout>
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
        callPost: (data) => {
            return dispatch(callPost(data))
        },
        callPopularPosts: (data) => {
            return dispatch(callPopularPosts(data))
        },
        callCategories: (data) => {
            return dispatch(callCategories(data))
        },
        callTags: (data) => {
            return dispatch(callTags(data))
        },
        callPostName: (data) => {
            return dispatch(callPostName(data))
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBlog)