import React, {useContext, useEffect, useState} from 'react'
import { Card } from '../components/Card'
import { RedditContext } from '../context/Reddit/RedditContext'
import { Loader } from '../components/Loader'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'

var currTimer;

export const Main = () => {
    const reddit = useContext(RedditContext)
    const [refresh, setRefresh] = useState(true)
    const [value, setValue] = useState({min:0, max:200})

    useEffect(() => {
        reddit.fetchLinks()
        //eslint-disable-next-line
    }, [])

    
    const toggleRefresh = (event) => {
        event.preventDefault()
        if(refresh){
            currTimer = setInterval(() => {
                reddit.fetchLinks()
            },3000)
        }
        else {
            clearInterval(currTimer)
        }
        setRefresh(ref => !ref)
    }

    
    function renderLinks() {
        
        let sortedLinks = reddit.links.sort((first, second) => {
            return second.data.num_comments - first.data.num_comments
        })
        
        let newLinks = sortedLinks.map((link) => {
            if(!(link.data.num_comments > value.min && link.data.num_comments < value.max)){
                return null
            } else {
                return <Card 
                    key = {link.data.id}
                    numOfComments = {link.data.num_comments}
                    link = {link.data.url}
                    title = {link.data.title}
                    img = {link.data.thumbnail}
                />
            }
        })
        var flag = false
        flag = newLinks.every((link => {
            if(link === null) return true
        }))
        if(flag){
            return <h1>No matches!</h1>
        } else return newLinks
    }

    return(
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className = "d-flex flex-row justify-content-between">
                <h1 className="display-6 text-warning">Top commented</h1> 
                <button 
                    type="button" 
                    className={!refresh ? 'btn-danger' : 'btn-warning'}
                    onClick = {(event) => {toggleRefresh(event)}}
                >{!refresh ? 'Stop' : 'Start'} refresh</button>
            </div>
            <InputRange
                maxValue={1000}
                minValue={0}
                value={value}
                onChange={value => setValue(value)}
            />
            <hr />
            {
                reddit.loader
                ?   <Loader />
                    
                :   
                <div className = 'container row parent'>
                    {renderLinks()} 
                </div>

            }

          </div>
        </div>
    )
}
