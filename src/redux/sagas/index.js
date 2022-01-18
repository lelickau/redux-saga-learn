import {take, takeEvery, takeLatest, takeLeading, put, call, fork, spawn, join, select} from 'redux-saga/effects'

async function getFetchData(pattern) {
    const request = await fetch(`https://jsonplaceholder.typicode.com/${pattern}`)

    const data = await request.json()
    return data
}

export function* loadTodos () {
    const todos = yield call(getFetchData, 'todos')
    yield put({type: 'SET_TODOS', payload: todos})
    return todos
}

export function* loadAlbum () {
    const albums = yield call(getFetchData, 'albums')
    yield put({type: 'SET_ALBUMS', payload: albums})
}

export function* workerSaga () {
    // выполняет бизнесс логику (запрос, таймер, запись в кэш и тд)
    // const task = yield fork(loadTodos)
    yield call(loadTodos)
    yield call(loadAlbum)

    const store = yield select(s => s)
    // const todos = yield join(task)
    // console.log(todos);
    console.log(store);
}

export function* watchLoadDataSaga () {
    // следит за dispatch action в приложении и запускает worker
    yield takeEvery('LOAD_DATA', workerSaga)
}

export default function* rootSaga() {
    yield fork(watchLoadDataSaga);
}

// take - указывает middleware ждать dispatch указанного действия. Генератор приостанавливается до тех пор, пака не будет отправлено указанное действие

// takeEvery на каждый dispatch action вызывает worker (workerSaga)

// takeLatas - автаматически отменяет любую предыдущую задачу саги, запущенную ранее, если она все еще выполняется

// takeLeading - автаматически отменяет любую следующию задачу саги, запущенную позднее, если первая запущенная все еще выполняется

// put - вызывает dispatch с переданным action

//call - выполняет переданную функцию. Если ф-ция вернет promise, приостановливает сагу до тех пор, пока promise не вызовет resolve

// take и call - блокирующие эффекты, takeEvery - сам по себе не блокирующий, но внутри он использует call + fork

// fork - эффект который указывает middleware выполнить неблокирующий вызов переданной ф-ции

// spawn - создает паралельную задачу в корне саги, сам процесс не привязан к родителю

// join - заблокировать не блокирующию задачу и получить ее результат

// select - получить данные из store, аналог useSelect/mapStateToProps