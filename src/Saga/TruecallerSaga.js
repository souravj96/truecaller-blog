import { put, takeLatest } from 'redux-saga/effects';

import { 
    receivePosts,
     errorPosts,
      receiveCategories,
       errorCategories, 
       receiveTags, 
       errorTags, 
       receivePost, 
       errorPost, 
       receivePopularPosts, 
       errorPopularPosts,
       receivePostName,
       errorPostName
     } from '../Action'

function* getAllPosts(data) {
    try {
        const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts?number=25&' + data.data.param, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());

        yield put(receivePosts(json));
    }
    catch (e) {
        yield put(errorPosts(e))
    }
}

function* getAllCategories(data) {
    try {
        const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/categories?order_by=count&order=DESC', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());

        yield put(receiveCategories(json));
    }
    catch (e) {
        yield put(errorCategories(e))
    }
}

function* getAllTags(data) {
    try {
        const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/tags/?order_by=count&order=DESC&number=10', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());

        yield put(receiveTags(json));
    }
    catch (e) {
        yield put(errorTags(e))
    }
}

function* getPost(data) {
    try {
        const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/' + data.data.param, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());

        yield put(receivePost(json));
    }
    catch (e) {
        yield put(errorPost(e))
    }
}

function* getPopularPosts(data) {
    try {
        const json = yield fetch('https://ttsh6q9o6l.execute-api.ap-south-1.amazonaws.com/test/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'postId': data.data.param })
        })
            .then(response => response.json());

        yield put(receivePopularPosts(json));
    }
    catch (e) {
        yield put(errorPopularPosts(e))
    }
}

function* getPostName(data) {
    try {
        const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/' + data.data.param, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json());

        yield put(receivePostName(json));
    }
    catch (e) {
        yield put(errorPostName(e))
    }
}

export function* actionWatcher() {
    yield takeLatest('CALL_POSTS_FROM_SERVER', getAllPosts);
    yield takeLatest('CALL_CATEGORIES_FROM_SERVER', getAllCategories);
    yield takeLatest('CALL_TAGS_FROM_SERVER', getAllTags);
    yield takeLatest('CALL_POST_FROM_SERVER', getPost);
    yield takeLatest('CALL_POPULAR_POSTS_FROM_SERVER', getPopularPosts);
    yield takeLatest('CALL_POST_NAME_FROM_SERVER', getPostName);
}