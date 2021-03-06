import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    const notifications = useSelector(state => state.notifications)

    return (
        <div>
            {notifications.map(notification => <p key={notification.id}>{notification.message}</p>)}
        </div>
    )
}

export default Notification