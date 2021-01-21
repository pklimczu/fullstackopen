const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return [action.data, ...state]
        case 'REMOVE_NOTIFICATION':
            return state.slice(0, state.length - 2)
        default:
            return state
    }
}

export const addNotification = (notification, timeout) => {
    const timeout_ms = timeout * 1000
    return async dispatch => { 
        dispatch(
        {
            type: "ADD_NOTIFICATION",
            data: notification
        })
        setTimeout(() => dispatch(removeNotification()), timeout_ms)
    }
}

export const removeNotification = () => {
    return {
        type: "REMOVE_NOTIFICATION",
        data: ""
    }
}

export default reducer