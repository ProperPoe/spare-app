import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.scss"
import { AuthContext } from '../../context/AuthContext'
import { NotifContext } from '../../context/NotifContext'
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

function Navbar() {
    const [showNav, setShowNav] = useState(false)

    const {currentUser} = useContext(AuthContext)
    const {currentPostId} = useContext(NotifContext)

    const {isLoading, err, data} = useQuery(["count"], () => 
        makeRequest.get("/count").then((res) => {
            console.log(res.data)
            return res.data
        })
    )


    const handleClick = () => {
        if(!showNav){
            setShowNav(true)
        }else{
            setShowNav(false)
        }
    }

    const closeNavActive = () => {
        if(window.innerWidth <= 600){
            setShowNav(false)
        }else{
            setShowNav(true)
        }
    }

    useEffect(() => {
        closeNavActive();
    }, [])

    window.addEventListener('resize', closeNavActive)

    const { logout } = useContext(AuthContext)

    /*const handleLogout = () => {
        logout()
    }*/

    return (
        <>
            <div className='navbar-container'>
                <div className='left'>
                    <div className='logo'>
                            <Link to="/">
                                <h1>BOOM</h1>   
                            </Link>
                    </div>
                </div>
                <div className='right'>
                    <div className='toggle-button' onClick={handleClick}>
                        <span className='bar'></span>
                        <span className='bar'></span>
                        <span className='bar'></span>
                    </div>
                    <div className={!showNav ? 'links-container' : 'links-container active'}>
                        <ul>
                            
                               <Link to="/" style={{textDecoration: "none"}} >
                                    <li onClick={handleClick} >Home</li>
                               </Link> 
                                
                                <Link to="/profile/dub" style={{textDecoration: "none"}}>
                                    <li onClick={handleClick}>Profile</li>
                               </Link>
                                
                                <Link to={`/notifications/${currentUser.id}`} style={{textDecoration: "none"}}>
                                    <li onClick={handleClick}>Notifications</li>
                                    
                               </Link>
                               <span>{data?.length === 0 ? "" : data?.length}</span>
                                <li onClick={logout}>Logout</li>
                               
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
