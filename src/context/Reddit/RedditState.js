import React, {useReducer} from 'react'
import { RedditContext } from './RedditContext'
import { RedditReducer } from './RedditReducer'
import axios from 'axios'
import { SET_LOADER, RENDER_LINKS}  from '../types'

export const RedditState = ({children}) => {

    const initialState = {
        links: [],
        loader: false
    }

    const [state, dispatch] = useReducer(RedditReducer, initialState)

    const fetchLinks = async () => {
        setLoading()
        const response = await axios.get('https://www.reddit.com/r/reactjs.json?limit=100')
        const links = response.data.data.children
        dispatch({
            type: RENDER_LINKS,
            payload:links
        })

    }
    const setLoading = () => {
        dispatch({
            type: SET_LOADER
        })
    }

    const {links, loader} = state


    return(
        <RedditContext.Provider value = {{links, loader, fetchLinks}}>
            {children}
        </RedditContext.Provider>
    )
}