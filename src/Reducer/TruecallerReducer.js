const TruecallerReducer = (state = {
    allPosts: [],
    post: {},
    totalPost: 999,
    nextPage: 1,
    categories: [],
    tags: [],
    category: "",
    tag: "",
    postLoading: false,
    categoryLoading: false,
    tagLoading: false,
    singlePostLoading: false,
    postsError: false,
    categoriesError: false,
    tagsError: false,
    postError: false,
    popularPosts: []
},
    action
) => {
    let newState = { ...state }
    switch (action.type) {
        case 'CHANGE_STORE':
            return { ...newState, ...action.data, type: action.type }
        case 'CALL_POSTS_FROM_SERVER':
            if (action.data.category) {
                newState.category = action.data.category
                newState.tag = ""
                newState.allPosts = []
            }
            if (action.data.tag) {
                newState.tag = action.data.tag
                newState.category = ""
                newState.allPosts = []
            }
            if (action.data.home) {
                newState.tag = ""
                newState.category = ""
                newState.allPosts = []
            }
            return { ...newState, postLoading: true, isFetched: false, type: action.type }
        case 'RECEIVE_POSTS_FROM_SERVER':
            newState.totalPost = action.data.found
            newState.nextPage = newState.nextPage + 1
            newState.allPosts = !newState.allPosts ? action.data.posts : newState.allPosts.concat(action.data.posts)
            return { ...newState, postLoading: false, isFetched: true, postsError: false, type: action.type }
        case 'ERROR_POSTS_FROM_SERVER':
            return { ...newState, postLoading: false, isFetched: true, postsError: true, type: action.type }
        case 'CALL_CATEGORIES_FROM_SERVER':
            return { ...newState, categoryLoading: true, isFetched: false, type: action.type }
        case 'RECEIVE_CATEGORIES_FROM_SERVER':
            return { ...newState, categoryLoading: false, isFetched: true, categoriesError: false, type: action.type, categories: action.data.categories }
        case 'ERROR_CATEGORY_FROM_SERVER':
            return { ...newState, categoryLoading: false, isFetched: true, categoriesError: true, type: action.type }
        case 'CALL_TAGS_FROM_SERVER':
            return { ...newState, tagLoading: true, isFetched: false, type: action.type }
        case 'RECEIVE_TAGS_FROM_SERVER':
            return { ...newState, tagLoading: false, isFetched: true, tagsError: false, type: action.type, tags: action.data.tags }
        case 'ERROR_TAGS_FROM_SERVER':
            return { ...newState, tagLoading: false, isFetched: true, tagsError: true, type: action.type }
        case 'CALL_POST_FROM_SERVER':
            return { ...newState, singlePostLoading: true, isFetched: false, type: action.type }
        case 'RECEIVE_POST_FROM_SERVER':
            return { ...newState, singlePostLoading: false, isFetched: true, postError: false, type: action.type, post: action.data }
        case 'ERROR_POST_FROM_SERVER':
            return { ...newState, singlePostLoading: false, isFetched: true, postError: true, type: action.type }
        case 'CALL_POPULAR_POSTS_FROM_SERVER':
            return { ...newState, popularPostsLoading: true, isFetched: false, type: action.type }
        case 'RECEIVE_POPULAR_POSTS_FROM_SERVER':
            return { ...newState, popularPostsLoading: false, isFetched: true, popularPostsError: false,postNameLoading: false, type: action.type, popularPosts: action.data.hits }
        case 'ERROR_POPULAR_POSTS_FROM_SERVER':
            return { ...newState, popularPostsLoading: false, isFetched: true, popularPostsError: true, type: action.type }
        case 'CALL_POST_NAME_FROM_SERVER':
            return { ...newState, postNameLoading: true, isFetched: false, type: action.type }
        case 'RECEIVE_POST_NAME_FROM_SERVER':
            let index = newState.popularPosts.findIndex(x => x.fields.post_id === action.data.ID);
            newState.popularPosts[index].fields.title = action.data.title
            newState.popularPosts[index].fields.post_thumbnail = action.data.post_thumbnail
            return { ...newState, postNameLoading: false, isFetched: true, postNameError: false, type: action.type, }
        case 'ERROR_POST_NAME_FROM_SERVER':
            return { ...newState, postNameLoading: false, isFetched: true, postNameError: true, type: action.type }
        default: {
            return newState
        }
    }
}

export default TruecallerReducer