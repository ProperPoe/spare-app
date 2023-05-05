import React from 'react'
import "./Posts.scss"
import Post from '../Post/Post'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

function Posts() {
    /*const posts = [
        {
            id: 1,
            username: "but",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, pariatur. Tempora, sapiente? Quisquam veritatis natus provident, laborum",
        },
        {
            id: 2,
            username: "joe",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, pariatur. Tempora, sapiente? Quisquam veritatis natus provident, laborum",
        },
        {
            id: 3,
            username: "fuck",
            desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam, pariatur. Tempora, sapiente? Quisquam veritatis natus provident, laborum",
        },
    ]*/

    const {isLoading, error, data} = useQuery(["Posts"], () =>
        makeRequest.get("/posts/").then((res) => {
            return res.data
        })
    )
    return (
        <>
            <div className='posts-container'>
                {isLoading ? "loading.." : data.map((post, ind) => {
                    return <Post post={post} key={ind} />
                })}
            </div>
        </>
    )
}

export default Posts
