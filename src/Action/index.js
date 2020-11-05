export const changeStore = (data) => {
    return ({ type: 'CHANGE_STORE', data })
}

export const callPosts = (data) => {
    return ({ type: 'CALL_POSTS_FROM_SERVER', data })
}

export const receivePosts = (data) => {
    return ({ type: 'RECEIVE_POSTS_FROM_SERVER', data })
}

export const errorPosts = (data) => {
    return ({ type: 'ERROR_POSTS_FROM_SERVER', data })
}

export const callCategories = (data) => {
    return ({ type: 'CALL_CATEGORIES_FROM_SERVER', data })
}

export const receiveCategories = (data) => {
    return ({ type: 'RECEIVE_CATEGORIES_FROM_SERVER', data })
}

export const errorCategories = (data) => {
    return ({ type: 'ERROR_CATEGORY_FROM_SERVER', data })
}

export const callTags = (data) => {
    return ({ type: 'CALL_TAGS_FROM_SERVER', data })
}

export const receiveTags = (data) => {
    return ({ type: 'RECEIVE_TAGS_FROM_SERVER', data })
}

export const errorTags = (data) => {
    return ({ type: 'ERROR_TAGS_FROM_SERVER', data })
}

export const callPost = (data) => {
    return ({ type: 'CALL_POST_FROM_SERVER', data })
}

export const receivePost = (data) => {
    return ({ type: 'RECEIVE_POST_FROM_SERVER', data })
}

export const errorPost = (data) => {
    return ({ type: 'ERROR_POST_FROM_SERVER', data })
}

export const callPopularPosts = (data) => {
    return ({ type: 'CALL_POPULAR_POSTS_FROM_SERVER', data })
}

export const receivePopularPosts = (data) => {
    return ({ type: 'RECEIVE_POPULAR_POSTS_FROM_SERVER', data })
}

export const errorPopularPosts = (data) => {
    return ({ type: 'ERROR_POPULAR_POSTS_FROM_SERVER', data })
}

export const callPostName = (data) => {
    return ({ type: 'CALL_POST_NAME_FROM_SERVER', data })
}

export const receivePostName = (data) => {
    return ({ type: 'RECEIVE_POST_NAME_FROM_SERVER', data })
}

export const errorPostName = (data) => {
    return ({ type: 'ERROR_POST_NAME_FROM_SERVER', data })
}