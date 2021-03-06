import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducer/blogsReducer'
import { addNotification } from '../reducer/notificationReducer'

const NewEntry = ({ hideFormHandler }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()

    const addEntryHandler = async (event) => {
        event.preventDefault()
        const entry = {
            title: title,
            author: author,
            url: url
        }

        dispatch(addBlog(entry))
        dispatch(addNotification('Blog is added'))
        hideFormHandler.current.toggleVisibility()
    }

    return (
        <div>
            <h2>Add a new blog entry</h2>
            <form onSubmit={addEntryHandler}>
                <span>title: </span>
                <input type="text" id="title_input" value={title} onChange={({ target }) => setTitle(target.value)} /><br/>
                <span>author: </span>
                <input type="text" id="author_input" value={author} onChange={({ target }) => setAuthor(target.value)} /><br/>
                <span>url: </span>
                <input type="text" id="url_input" value={url} onChange={({ target }) => setUrl(target.value)} /><br/>
                <button type="submit">add entry</button>
            </form>
        </div>
    )
}

NewEntry.propTypes = {
    hideFormHandler: PropTypes.object.isRequired
}

export default NewEntry