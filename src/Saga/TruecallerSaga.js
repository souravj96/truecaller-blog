import { put, takeLatest, call, race, delay } from 'redux-saga/effects';

import { receivePosts } from '../Action'

function* getAllPosts(data) {
    const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts/?' + data.data, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json());

    yield put(receivePosts(json));
}

export function* actionWatcher() {
    yield takeLatest('CALL_POSTS_FROM_SERVER', getAllPosts);
}