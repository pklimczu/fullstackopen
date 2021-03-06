import React, { useEffect, useRef } from 'react'
import Togglable from './Togglable'
import BlogEntry from './BlogEntry'
import NewEntry from './NewEntry'
import Notification from './Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog } from '../reducer/blogsReducer'
import { getUsers } from '../reducer/usersReducer'
import Menu from './Menu'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Users from './Users'
import UserDetails from './UserDetails'

const Blog = ({ username, handleLogout }) => {

    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const newEntryFormRef = useRef()

    useEffect(() => {
        dispatch(initializeBlog())
    }, [dispatch])

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const users = useSelector(state => state.users)
    const match = useRouteMatch('/users/:id')
    const details = (match && users.find) ? users.find(user => user.id === match.params.id) : null

    return (
        <div>
            <Menu />
            <h2>blogs</h2>
            <Notification />
            <hr/>
            <Switch>
                <Route path="/users/:id">
                    <UserDetails details={details} />
                </Route>
                <Route path="/users">
                    <Users users={users} />
                </Route>
                <Route path="/">
                Logged as {username} <button onClick={handleLogout}>logout</button>
                    <hr/>
                    <Togglable buttonLabel="new note form" ref={newEntryFormRef}>
                        <NewEntry blogs={blogs} hideFormHandler={newEntryFormRef} />
                    </Togglable>
                    <hr />
                    {blogs.sort((b1, b2) => b2.likes - b1.likes)
                        .map(blog =>
                            <BlogEntry key={blog.id} blog={blog} />
                        )}
                </Route>
            </Switch>
        </div>
    )
}

export default Blog