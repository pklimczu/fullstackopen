import React from 'react'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {

    const style = {
        padding: 20,
        fontWeight: 'bold'
    }

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <td style={style}>user</td><td style={style}>blogs created</td>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map(user => <tr key={user.id}>
                        <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>) : <tr><td>no user</td></tr>}
                </tbody>
            </table>
        </div>
    )
}

export default Users