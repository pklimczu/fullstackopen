import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Login from './components/Login'
import { logoutUser, restoreUser } from './reducer/userReducer'
import Container from '@material-ui/core/Container'

const App = () => {

    const user = useSelector(state => state.user)
    const disptach = useDispatch()

    useEffect(() => {
        disptach(restoreUser())
    }, [disptach])

    const handleLogout = async (event) => {
        event.preventDefault()
        disptach(logoutUser())
    }

    return (
        <Container>
            {user === null ?
                <Login />
                : <Blog username={JSON.stringify(user.name)} handleLogout={handleLogout} />
            }
        </Container>
    )
}

export default App