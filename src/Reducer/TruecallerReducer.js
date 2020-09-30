const TruecallerReducer = (state = {}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case 'CALL_POSTS_FROM_SERVER':
            return { ...newState, loading: true, isFetched: false, type: action.type }
        case 'RECEIVE_POSTS_FROM_SERVER':
            return { ...newState, posts: action.data.json, loading: false, isFetched: true, type: action.type }
        default: {
            return newState

        }
    };
}

export default TruecallerReducer