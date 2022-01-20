import {call, spawn, all, take, fork, takeLatest, cancel} from 'redux-saga/effects'
import loadBasicData from './initialSagas'
import pageLoaderSaga from './pageLoaderSaga'

export function* fetchComment(signal) {
    const res = yield call(fetch, 'https://jsonplaceholder.typicode.com/comments', {signal})
    const data = yield call([res, res.json])

    console.log('load some data', data);

}

export function* loadOnAction () {
    // yield takeLatest('LOAD_SOME_DATA', fetchComment)
    // takeLatest - берет последний вызов таск саги и исполняет тоько его, а предидущие отменяет

    let task;
    let abortController = new AbortController()

    while (true) {
        yield take('LOAD_SOME_DATA')
        if (task) {
            abortController.abort()
            yield cancel(task)
            abortController = new AbortController()
        }

        task = yield fork(fetchComment, abortController.signal)
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


