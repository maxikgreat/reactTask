import React from 'react'

export const Card = ({numOfComments, link, title, img}) => {


    if(img === 'self' || img === 'default'){
        img = 'https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_1600,c_limit/reddit-alien-red-st.jpg'
    }

    return (
        <div className="card col-lg-4 mb-2 d-flex flex-column justify-content-between align-items-center text-center">
            <img src={img} className="card-img-top" alt='Nothing to show' />
            <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Number of comments: <strong>{numOfComments}</strong></p>
                <a href={link} rel="noopener noreferrer" target = '_blank'className="link">Go somewhere</a>
            </div>
        </div>
    )
}