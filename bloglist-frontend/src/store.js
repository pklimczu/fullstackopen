import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogsReducer from './reducer/blogsReducer'
import notificationReducer from './reducer/notificationReducer'
import userReducer from './reducer/userReducer'
import usersReducer from './reducer/usersReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notifications: notificationReducer,
    user: userReducer,
    users: usersReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store