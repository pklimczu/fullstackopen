import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducer/userReducer'
import { addNotification } from '../reducer/notificationReducer'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const disptach = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        const status = await disptach(loginUser({ username, password }))
        if (status === null) {
            disptach(addNotification('Incorrect credentials'))
        }
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h1>log in to application</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <span>username </span>
                    <input type="text" value={username} name="Username" id="login_input"
                        onChange={({ target }) => setUsername(target.value)} />
                </div>
                <div>
                    <span>password </span>
                    <input type="password" value={password} name="Password" id="password_input"
                        onChange={({ target }) => setPassword(target.value)} />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login