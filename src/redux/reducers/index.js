import { connectRouter } from "connected-react-router"
import { createBrowserHistory } from "history"
import { combineReducers } from "redux"
import peopleReducer from "./people"
import peopleDetailsReducer from "./peopleDetails"

export const history = createBrowserHistory()
const initialState = {}

export function appReducer(state = initialState, action) {
    return state
}

const rootReducer = combineReducers({
    app: appReducer,
    people: peopleReducer,
    peopleDetails: peopleDetailsReducer,
    router: connectRouter(history)
})

export default rootReducer