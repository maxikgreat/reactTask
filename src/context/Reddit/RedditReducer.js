import { RENDER_LINKS, SET_LOADER} from "../types"


const handlers = {
    [RENDER_LINKS]: (state, {payload}) => {
        return {
            ...state,
            links: payload,
            loader: false
        }
    },
    [SET_LOADER]: (state) => {
        return{
            ...state,
            loader: true
        }
    },
    DEFAULT: state => state
}

export const RedditReducer = (state, action) => {
     const handler = handlers[action.type] || handlers.DEFAULT
     return handler(state,action)
}