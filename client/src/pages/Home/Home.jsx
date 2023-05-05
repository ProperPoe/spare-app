import React, { useContext } from 'react'
import "./Home.scss"
import Posts from '../../components/Posts/Posts'
import Share from '../../components/Share/Share'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { NotifContext } from '../../context/NotifContext'
import { AuthContext } from '../../context/AuthContext'
function Home() {
    const {addNotif} = useContext(NotifContext)
    const {currentUser} = useContext(AuthContext)
    /*const {isLoading, err, data} = useQuery(["notifications"] , () => 
        makeRequest.get("/notifications?userId=" + currentUser.id).then((res) => {
            addNotif(res.data.length)
            return res.data
        })
    )*/
    return (
    
        <>
            <div className='home'>
                <Share />
                <Posts />
            </div>
            
        </>
    )
}

export default Home
