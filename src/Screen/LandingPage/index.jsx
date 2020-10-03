import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

import { UserOutlined, ClockCircleOutlined, ReloadOutlined } from '@ant-design/icons'

import { BackTop, Skeleton } from 'antd'

import { changeStore, callPosts, callCategories, callTags } from '../../Action'

import MainLayout from '../MainLayout/index'

// Components
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'
import { SCard, SMeta } from '../../ant_storybook/src/Components/Card'
import { SAvatar } from '../../ant_storybook/src/Components/Avatar'
import { STag } from '../../ant_storybook/src/Components/Tag'
import { SList, SListItem } from '../../ant_storybook/src/Components/List'
import { SBadge } from '../../ant_storybook/src/Components/Badge'
import { SButton } from '../../ant_storybook/src/Components/Button'

import './style.css'

class LandingPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            page: !this.props.match.params.id ? 1 : this.props.match.params.id,
            params: !this.props.location.params ? {} : this.props.location.params
        }
    }

    componentDidMount() {
        this.handleFirstPost(this.state.params)
        this.props.callCategories()
        this.props.callTags()
    }

    handleNextPosts = (lastPostCount) => {
        if (this.props.state.TruecallerReducer.allPosts && (this.props.state.TruecallerReducer.allPosts.length < lastPostCount * 25) && this.props.state.TruecallerReducer.allPosts.length < this.props.state.TruecallerReducer.totalPost) {
            this.props.callPosts({ param: "category=" + this.props.state.TruecallerReducer.category + "&tag=" + this.props.state.TruecallerReducer.tag + "&page=" + lastPostCount })
        }
        else {
            if (this.props.state.TruecallerReducer.postsError) {
                this.props.changeStore({ postsError: false })
            }
        }
    }

    handleFirstPost = (data) => {
        this.setState({ page: 1 })
        let category = !data.category ? "" : data.category
        let tag = !data.tag ? "" : data.tag
        this.props.callPosts({
            ...data,
            param: "category=" + category + "&tag=" + tag + "&page=1"
        })
        this.props.history.push("/");
    }

    generateCardDescription = (post) => {
        return (
            <div className="mb-2">
                {ReactHtmlParser(post.excerpt)}
                <UserOutlined className="mr-1" />
                <span className="mr-3 text-primary">{!post.author ? "" : post.author.name}</span>
                <ClockCircleOutlined className="mr-1" />
                <span className="text-primary">
                    {moment().diff(moment(post.date), 'days') > 6 ? moment(post.date).format('ll') : moment(post.date).fromNow()}
                </span>
                <br /><br />
                <SCol xs={24} md={0}>
                    {
                        Object.keys(post.categories).map((tag) =>
                            <STag key={'side' + tag} color="blue" onClick={() => this.handleFirstPost({ category: post.categories[tag].slug })}>{tag}</STag>
                        )
                    }
                </SCol>
                <br />
                {
                    Object.keys(post.tags).map((tag) => <span key={tag} className="custom-tag m-1" onClick={() => this.handleFirstPost({ tag: post.tags[tag].slug })}>{tag}</span>)
                }
            </div>
        )
    }

    handleClick = (page) => {
        if (this.state.page !== page) {
            this.handleNextPosts(page)
            this.setState({ page })
            this.props.history.push("/" + page);
        }
    }

    handleReloadPost = (page) => {
        this.handleNextPosts(page)
        this.setState({ page })
        this.props.history.push("/" + page);
    }

    setPage = (page) => {
        this.setState({ page })
    }

    render() {
        return (
            <MainLayout setPage={this.setPage} >
                <SRow className="vh-100 mx-2 my-3">
                    <BackTop />
                    <SCol xs={24} md={18}>
                        <SRow>
                            <SCol xs={0} md={4}></SCol>
                            <SCol xs={24} md={16}>
                                {
                                    this.props.state.TruecallerReducer.postLoading ?
                                        <SCard className="mb-3 shadow-sm">
                                            <Skeleton.Image active className="w-100 mb-3" />
                                            <Skeleton active avatar paragraph={{ rows: 4 }} />
                                        </SCard>
                                        :
                                        this.props.state.TruecallerReducer.postsError ?
                                            <div className="w-100 mb-3 bg-light d-flex" style={{ height: '120px' }}>
                                                <ReloadOutlined className="align-self-center mx-auto" onClick={() => this.handleReloadPost(this.state.page)} />
                                            </div>
                                            :
                                            !this.props.state.TruecallerReducer.allPosts ?
                                                null :
                                                this.props.state.TruecallerReducer.allPosts.map((post, index) =>
                                                    (this.state.page * 25) - 25 <= index && index < this.state.page * 25 ?
                                                        <SCard
                                                            key={post.ID}
                                                            cover={
                                                                <img
                                                                    alt="example"
                                                                    src={!post.post_thumbnail ? "/placeholder-640x480.jpg" : post.post_thumbnail.URL}
                                                                />
                                                            }
                                                            className="mb-3 shadow-sm"
                                                            actions={[
                                                                <SButton onClick={() => this.props.history.push("/solo/" + post.ID)} className="float-right mr-3">Continue Reading →</SButton>
                                                            ]}
                                                        >
                                                            <SCol xs={0} md={24}>
                                                                {
                                                                    Object.keys(post.categories).map((tag) =>
                                                                        <STag key={'post' + tag} color="blue" className="float-right" onClick={() => this.handleFirstPost({ category: post.categories[tag].slug })}>{tag}</STag>
                                                                    )
                                                                }
                                                            </SCol>
                                                            <SMeta
                                                                avatar={<SAvatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{!post.author ? "" : post.author.name.slice(0, 1)}</SAvatar>}
                                                                title={post.title}
                                                                description={this.generateCardDescription(post)}
                                                            />
                                                        </SCard>
                                                        : null
                                                )
                                }
                                <SButton onClick={() => this.handleClick(this.state.page === 1 ? 1 : this.state.page - 1)} disabled={this.state.page === 1}>{'< PREVIOUS'}</SButton>
                                <SButton className="float-right" onClick={() => this.handleClick(this.state.page === this.props.state.TruecallerReducer.totalPost % 25 ? this.props.state.TruecallerReducer.totalPost % 25 : this.state.page + 1)} disabled={this.state.page === this.props.state.TruecallerReducer.totalPost % 25}>{'NEXT >'}</SButton>
                            </SCol>
                            <SCol xs={0} md={4}></SCol>
                        </SRow>
                    </SCol>
                    <SCol xs={0} md={6}>
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
                                            <SListItem key={'side' + category.slug} onClick={() => this.handleFirstPost({ category: category.slug })}>
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
                                            <SListItem key={'side' + tag.slug} onClick={() => this.handleFirstPost({ tag: tag.slug })}>
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
        changeStore: (data) => {
            return dispatch(changeStore(data))
        },
        callPosts: (data) => {
            return dispatch(callPosts(data))
        },
        callCategories: (data) => {
            return dispatch(callCategories(data))
        },
        callTags: (data) => {
            return dispatch(callTags(data))
        },
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage))