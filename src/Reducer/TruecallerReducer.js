const TruecallerReducer = (state = { allPosts: [], totalPost: 999 }, action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'CALL_POSTS_FROM_SERVER':
            return { ...newState, loading: true, isFetched: false, type: action.type }
        case 'RECEIVE_POSTS_FROM_SERVER':
            newState.totalPost = action.data.found
            newState.nextPage = action.data.meta.next_page
            newState.allPosts = !newState.allPosts ? action.data.posts : newState.allPosts.concat(action.data.posts)
            return { ...newState, loading: false, isFetched: true, type: action.type }
        default: {
            return newState
        }
    }
}

export default TruecallerReducer