const initialState = {
    todos: [],
    albums: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TODOS':  {
            return {
                ...state,
                todos: [
                    ...state.todos,
                    ...action.payload
                ]
            }
        }
        case 'SET_ALBUMS':  {
            return {
                ...state,
                albums: [
                    ...state.albums,
                    ...action.payload
                ]
            }
        }
        default:
            return state
    }
}