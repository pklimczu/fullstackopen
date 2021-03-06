const notificationReducer = (state = [], action) => {
    switch (action.type) {
    case 'ADD_NOTIFICATION':
        return [...state, action.data]
    case 'POP_NOTIFICATION':
        return state.slice(1, state.length)
    default:
        return state
    }
}

const generateUuid = () => '_' + Math.random().toString(36).substr(2, 9)

export const addNotification = (message) => {
    console.log(message)
    return async dispatch => {
        dispatch({
            type: 'ADD_NOTIFICATION',
            data: { message: message, id: generateUuid() }
        })
        setTimeout(() => dispatch({
            type: 'POP_NOTIFICATION'
        }), 5000)
    }
}

export default notificationReducer