import { all } from 'redux-saga/effects'
import { actionWatcher as TruecallerSaga } from './TruecallerSaga'

export default function* rootSaga() {
    yield all([
        TruecallerSaga()
    ]);
}