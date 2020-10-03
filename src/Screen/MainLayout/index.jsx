import React from 'react'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'

import { SLayout, SMenu, SMenuItem, SSider, SContent, SSubMenu } from '../../ant_storybook/src/Components/Layout'
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'

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
            <SRow>
                <SCol md={24} xs={0}>
                    <SLayout>
                        <SContent style={{ padding: '0 50px' }}>
                            {this.props.children}
                        </SContent>
                    </SLayout>
                </SCol>
                <SCol md={0} xs={24}>
                    <SLayout>
                        <SSider
                            breakpoint="lg"
                            collapsedWidth="0"
                            onBreakpoint={broken => {
                                console.log(broken);
                            }}
                            onCollapse={(collapsed, type) => {
                                console.log(collapsed, type);
                            }}
                            className="vh-100"
                        >
                            <img src="/truecaller-logo-white.png" alt="Truecaller" style={{ width: '120px' }} onClick={() => this.handleFirstPost({ home: true })} />
                            <SMenu theme="dark" mode="inline">
                                <SSubMenu key="1" title="CATEGORIES">
                                    {
                                        this.props.state.TruecallerReducer.categories.map((category) =>
                                            <SMenuItem key={'menu' + category.slug} onClick={() => this.handleFirstPost({ category: category.slug })}>{category.name}</SMenuItem>
                                        )
                                    }
                                </SSubMenu>
                                <SSubMenu key="2" title="TOP TAGS">
                                {
                                        this.props.state.TruecallerReducer.tags.map((tag) =>
                                            <SMenuItem key={'menu' + tag.slug} onClick={() => this.handleFirstPost({ tag: tag.slug })}>{tag.name}</SMenuItem>
                                        )
                                    }
                                </SSubMenu>
                            </SMenu>
                        </SSider>
                        <SLayout>
                            <SContent >
                                {this.props.children}
                            </SContent>
                        </SLayout>
                    </SLayout>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout))