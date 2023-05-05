import { useMutation, useQueryClient } from '@tanstack/react-query'
import './Update.scss'

import React, { useState } from 'react'
import { makeRequest } from '../../axios'

function Update({setOpenUpdate, post}) {
    const [desc, setDesc] = useState("")

    const client = useQueryClient()

    const updateMutation = useMutation((postId) => {
        return makeRequest.put("/posts/"+postId, {desc})
    },{
        onSuccess: () => {
            client.invalidateQueries(["Posts"])
        }
    }
    )

    const handleEdit = (e) => {
        e.preventDefault()

        updateMutation.mutate(post.id)

        setOpenUpdate(false)
    }

    return (
        <>
        <div className='update'>
            <form>
                <input type="text" onChange={(e) => setDesc(e.target.value)}/>
                <button onClick={handleEdit}>Submit</button>
            </form>
            <button onClick={() => setOpenUpdate(false)}>X</button>
        </div>
        </>
    )
}

export default Update
