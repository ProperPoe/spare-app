import { useParams } from "react-router-dom"
import "./Notifications.scss"
import Notification from '../Notification/Notification'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import React, { useContext } from 'react'
import { makeRequest } from "../../axios"
import { NotifContext } from "../../context/NotifContext"
import { AuthContext } from "../../context/AuthContext"

function Notifications() {
    
    const {currentUser} = useContext(AuthContext)
    const {addNotif, currentPostId, removeNotif} = useContext(NotifContext)
    const userId = useParams()

    const {isLoading, err, data} = useQuery(["notifications"] , () => 
        makeRequest.get("/notifications?userId=" + userId.id).then((res) => {
            //addNotif(res.data.length)
            return res.data
        })
    )


    return (
        <>
        <div className="notifs-container">
            {isLoading ? "loading..." : data.map((notif, ind) => {
                return <Notification notif={notif} key={ind} />
                    
            })
            }
            
            
        </div>
        </>
    )
}

export default Notifications
