import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeRequest } from '../../axios'
import "./Register.scss"

function Register() {
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
        password: "",
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
        console.log(inputs)
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await makeRequest.post("/auth/register", inputs)
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='register-container'>
            <form>
                <input type="text" placeholder='Enter Email foo!' name='email' onChange={handleChange}/>
                <input type="text" placeholder='Enter Username foo!' name='username' onChange={handleChange}/>
                <input type="text" placeholder='Enter Password foo!' name='password' onChange={handleChange}/>
                <button onClick={handleRegister}>Submit</button>
                <button onClick={() => navigate("/login")} >Go Login!</button>
            </form>
        </div>
    )
}

export default Register
