import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { makeRequest } from '../../axios'
import "./Share.scss"

function Share() {
    const [desc, setDesc] = useState("")
    const client = useQueryClient()

    const mutation = useMutation((newPost) => {
        return makeRequest.post("/posts", newPost)
    },
    {
        onSuccess: () => {
            client.invalidateQueries(["Posts"])
        }
    }
    )

    const handleClick = (e) => {
        e.preventDefault()
        mutation.mutate({desc})
    }

    return (
        <div className='share-container'>
            <form>
                <input type="text" onChange={(e) => setDesc(e.target.value)} />
                <button onClick={handleClick}>Add</button>
            </form>
        </div>
    )
}

export default Share
