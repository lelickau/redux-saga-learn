import {call, spawn, all, fork, delay} from 'redux-saga/effects'

// асинхронные действия / запросы при входе в приложение
function* auth() {
    // delay() - ожидать(n секунд) (синхронный 'setTimeout')
    yield delay(2000)
    console.log('auth ok');
    return true
}

function* loadUsers() {
    const req = yield call(fetch, 'https://jsonplaceholder.typicode.com/users')
    const data = yield call([req, req.json])
    console.log('data', data);
}

export function* loadBasicData () {
    yield all([
        fork(auth),
        fork(loadUsers)
    ])
}


export default function* rootSaga() {
    const sagas = [loadBasicData]

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

// all - запускает несколько эффектов параллельно и ждет их завершения

