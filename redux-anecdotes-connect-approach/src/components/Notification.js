import React from 'react'
import { connect, useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    if (notification.length > 0) {
        return (
            <div style={style}>
            {notification[0]}
            </div>
        )
    } else {
        return <div></div>
    }
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConntectedNotification = connect(
    mapStateToProps,
    null
)(Notification)
export default ConntectedNotification