import blogService from '../services/blogsService'
import loginService from '../services/loginService'

const userReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.data
    case 'LOGOUT':
        return action.data
    case 'RESTORE':
        return action.data
    default:
        return state
    }
}

export const loginUser = ({ username, password }) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: user
        })
        return user
    }
}

export const logoutUser = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
    return {
        type: 'LOGOUT',
        data: null
    }
}

export const restoreUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'RESTORE',
                data: user
            })
        }
    }
}

export default userReducer