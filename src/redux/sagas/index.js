import {call, spawn, all, take, fork, takeLatest, cancel, actionChannel} from 'redux-saga/effects'
import loadBasicData from './initialSagas'
import pageLoaderSaga from './pageLoaderSaga'

export function* fetchComment() {
    const res = yield call(fetch, 'https://jsonplaceholder.typicode.com/comments')
    const data = yield call([res, res.json])

    console.log('load some data', data);

}

export function* loadOnAction () {
    const channel = yield actionChannel('LOAD_SOME_DATA')
    while (true) {
        yield take(channel)
        yield call(fetchComment)
        console.log('log');
    }
}

export default function* rootSaga() {
    const sagas = [loadBasicData, pageLoaderSaga, loadOnAction]

    const retrySagas = sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (e) {
                    console.log(e);
                }
            }
        })
    })
    yield all(retrySagas)
}


