import "./ViewPost.scss"

import React from 'react'

function ViewPost({setViewClicked, view}) {
    return (
        <>
        <div className='view-card-container' onClick={() => setViewClicked(false)}>
            <div className='top'>
                <div className='top-left'>
                    <span>{view[0]?.username}</span>
                    <span>1 year ago</span>
                </div>
                {/*currentUser.id === post.userId ?
                <div className='top-right'>
                    <button onClick={() => setOpenUpdate(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>: ""*/}

            </div>
            <div className='middle'>
                {view[0]?.desc}
            </div>
            <div className='bottom'>
                <span >Like 12</span>
            </div>
            {/*openUpdate ? <Update setOpenUpdate={setOpenUpdate}  post={post} /> : ""*/}
        </div>
        </>
    )
}

export default ViewPost
