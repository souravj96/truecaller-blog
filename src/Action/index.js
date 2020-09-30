export const callPosts = (data) => {
    return ({ type: 'CALL_POSTS_FROM_SERVER', data })
}

export const receivePosts = (data) => {
    return ({ type: 'RECEIVE_POSTS_FROM_SERVER', data })
}