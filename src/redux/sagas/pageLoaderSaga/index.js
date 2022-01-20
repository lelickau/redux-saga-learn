import { LOCATION_CHANGE } from "connected-react-router";
import { apply, call, fork, put, take } from "redux-saga/effects";

// apply - вызывают ф-цию в контексте первого аргумента
function* loadBlogData () {
    const req = yield call(fetch, 'https://jsonplaceholder.typicode.com/todos')
    const data = yield apply(req, req.json)

    yield put({type: 'BLOG_LOADED', payload: data})
}

export default function* pageLoaderSaga () {
    while (true) {
        const action = yield take(LOCATION_CHANGE)
        console.log('>>', action);
        if (action.payload.location.pathname.endsWith('blog')) {
            yield fork(loadBlogData)
        }
    }
    // yield takeEvery('LOAD_BLOG_DATA', loadBlogData)
}