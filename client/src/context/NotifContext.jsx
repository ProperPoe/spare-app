import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { makeRequest } from "../axios";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const NotifContext = createContext()

export const NotifContextProvider = ({children}) => {
    const [currentPostId, setCurrentPostId] = useState()
    //const client = useQueryClient();


    const addNotif = () => {
        
    }

    
    
    /*const removeNotifMutation = useMutation((notifId)=>{
        return makeRequest("/notifications")
    },{
        onSuccess: () => {
            client.invalidateQueries(["notifications"])
        }
    })*/
    const removeNotif = () => {
        
    }

    return (
        <NotifContext.Provider value={{currentPostId, addNotif, removeNotif}}>{children}</NotifContext.Provider>
    )
}