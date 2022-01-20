import { connectRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import { combineReducers } from "redux"

export const history = createBrowserHistory()
const initialState = {
    blog: {}
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'BLOG_LOADED':
            return {
                ...state,
                blog: action.payload
            }

        default:
            break;
    }
    return state
}

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history)
})

export default rootReducer