import {call, fork, spawn, all} from 'redux-saga/effects'

export function* saga1 () {
    console.log('saga1');
}
export function* saga2 () {
    console.log('saga2');
}
export function* saga3 () {
    console.log('saga3');
}

export default function* rootSaga() {
    // способы вызова
    // 1 способ: fork создает не блокирующий вызов - code будет выполнен сразу после запуска yield в случае ошибки любой из саг - последующие процессы будут отменены, а rootSaga не будет более выполняться, при дальнейшем вызове ничего происходить не будет
    // yield [
    //     fork(saga1),
    //     fork(saga2),
    //     fork(saga3),
    // ]
    // code

    // 2 способ: саги запустятся параллельно, rootSaga будет заблокирована пока не исполнятся все саги, в случае ошибки любой из саг - последующие процессы будут отменены, а rootSaga не будет более выполняться, при дальнейшем вызове ничего происходить не будет
    // yield [
    //     saga1(),
    //     saga2(),
    //     saga3(),
    // ]
    // code

    // 3 способ: отработает так же как 1 способ
    // yield fork(saga1);
    // yield fork(saga2);
    // yield fork(saga3);
    // code

    // 4 способ: spawn создает распределенную задачу в корне процессов - саги будут разделены друг от друга и от родительской задачи, в случае ошибки любой из саг - процессы не остановятся
    // yield spawn(saga1); // auth
    // yield spawn(saga2); // users
    // yield spawn(saga3); // payments
    // code

    // 5 способ
    const sagas = [saga1, saga2, saga3]

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

