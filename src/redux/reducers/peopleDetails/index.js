import { LOAD_USER_DETAILS, LOAD_USER_DETAILS_FAILURE, LOAD_USER_DETAILS_SUCCESS } from "./actions"

const initialDetailsPeopleState = {
    loading: false,
    error: null,
    data: null,
}

export default function peopleDetailsReducer(state = initialDetailsPeopleState, action) {
    switch (action.type) {
        case LOAD_USER_DETAILS:

            return {
                ...state,
                loading: true,
            }

        case LOAD_USER_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }

        case LOAD_USER_DETAILS_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            }

        default:
            return state
    }
}