import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import "./Login.scss"

function Login() {
    const [inputs, setInputs] = useState({
        email: "", 
        password: "",
    })

    const { login, currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            if(currentUser){
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login-container'>
            <form>
                <input type="text" placeholder='Enter Email foo!' name='email' onChange={handleChange}/>
                <input type="text" placeholder='Enter Password foo!' name='password' onChange={handleChange}/>
                <button onClick={handleLogin}>Submit</button>
                <button onClick={() => navigate("/register")}>Register</button>
                <button onClick={() => navigate("/")}>Go Back mayne!</button>
            </form>
        </div>
    )
}

export default Login
