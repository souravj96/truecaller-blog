import { put, takeLatest, call, race, delay } from 'redux-saga/effects';

import { receivePosts } from '../Action'

function* getAllPosts(data) {
    try {
        const json = yield fetch('https://public-api.wordpress.com/rest/v1.1/sites/107403796/posts?number=25&' + data.data, {
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
        console.log("ERROR: ", e)
    }
}

export function* actionWatcher() {
    yield takeLatest('CALL_POSTS_FROM_SERVER', getAllPosts);
}