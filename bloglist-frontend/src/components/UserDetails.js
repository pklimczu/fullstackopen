import React from 'react'
import { Redirect } from 'react-router-dom'

const UserDetails = ({ details }) => {

    if (!details) {
        return <Redirect to="/users" />
    }

    return (
        <div>
            <h2>{details.username}</h2>
            <ul>
                {console.log(details.blogs)}
                {details.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
            </ul>
        </div>
    )
}

export default UserDetails