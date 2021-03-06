import usersService from '../services/usersService'

const usersReducer = (state = {}, action) => {
    switch (action.type) {
    case 'GET_USERS':
        return action.data
    default:
        return state
    }
}

export const getUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}

export default usersReducer