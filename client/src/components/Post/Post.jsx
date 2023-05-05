import React, { useContext, useState } from 'react'
import "./Post.scss"
import moment from 'moment'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import Update from '../Update/Update'
import { AuthContext } from '../../context/AuthContext'
import { NotifContext } from '../../context/NotifContext'

function Post({post, postViewId, setViewId, setViewClicked }) {
    const [openUpdate, setOpenUpdate] = useState(false)

     const {currentUser} = useContext(AuthContext)
     const {addNotif} = useContext(NotifContext)

    const client = useQueryClient()

    const {isLoading, err, data} = useQuery(["likes", post.id], () =>
        makeRequest.get("/likes?postId="+post.id).then((res)=>{
            return res.data
        })
    )

    const likeMutation = useMutation((liked) => {
        if(liked) return makeRequest.delete("/likes?postId="+post.id)
        return makeRequest.post("/likes", {postId: post.id})
    },{
        onSuccess: () => {
            client.invalidateQueries(["likes"])
        }
    })
    
    const notifMutation = useMutation((liked) => {
        if(liked) return makeRequest.delete("/notifications?postId="+post.id)
        return makeRequest.post("/notifications", {userId: currentUser.id, postId: post.id})
    },{
        onSuccess: () => {
            client.invalidateQueries(["notifications"])
        }
    })
    
    const countMutation = useMutation((liked) => {
        if(liked) return makeRequest.delete("/count?postId="+post.id)
        return makeRequest.post("/count", {userId: currentUser.id, postId: post.id})
    },{
        onSuccess: () => {
            client.invalidateQueries(["count"])
        }
    })

    const deleteMutaion = useMutation((postId) => {
            return makeRequest.delete("/posts/"+postId)
        },{
            onSuccess: () => {
                client.invalidateQueries(["Posts"])
            }
        }
    )

    const handleLike = () => {
        countMutation.mutate(data.includes(currentUser.id))
        likeMutation.mutate(data.includes(currentUser.id))
        notifMutation.mutate(data.includes(currentUser.id))
        //console.log(post.id)
        //addNotif(post.id)
    }

    const handleDelete = () => {
        deleteMutaion.mutate(post.id)
    }

    
    return (
        <div className='post-card-container'>
            <div className='top'>
                <div className='top-left'>
                    <span>{post.username}</span>
                    <span>{moment(post.createdAt).fromNow()}</span>
                </div>
                {currentUser.id === post.userId ?
                <div className='top-right'>
                    <button onClick={() => setOpenUpdate(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>: ""}

            </div>
            <div className='middle'>
                {post.desc}
            </div>
            <div className='bottom'>
                <span onClick={handleLike}>Like {data?.length}</span>
            </div>
            {openUpdate ? <Update setOpenUpdate={setOpenUpdate}  post={post} /> : ""}
        </div>
    )
}

export default Post
