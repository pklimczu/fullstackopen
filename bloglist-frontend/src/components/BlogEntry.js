import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { likeBlog, deleteBlog, addCommentToBlog } from '../reducer/blogsReducer'
import { addNotification } from '../reducer/notificationReducer'

const BlogEntry = ({ blog, extraEventHandlerForLikesUpdate }) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const dispatch = useDispatch()

    const comment = useField('comment')

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const updateLikes = async () => {
        if (extraEventHandlerForLikesUpdate) {
            extraEventHandlerForLikesUpdate()
            return
        }
        dispatch(likeBlog(blog))
        dispatch(addNotification('Blog is liked'))
    }

    const removeEntry = async () => {
        const blogId = blog.id
        const response = await dispatch(deleteBlog(blogId))
        if (response !== 204) {
            dispatch(addNotification('Blog was not removed'))
        }
    }

    const addComment = async (event) => {
        event.preventDefault()

        const updatedBlog = {
            ...blog,
            comments: [...blog.comments, comment.value]
        }

        comment.reset()

        dispatch(addCommentToBlog(updatedBlog))
    }

    const getRandomKey = () => {
        return Math.round(Math.random() * 1000)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 4,
        paddingBottom: 10,
        borderLeft: 'solid',
        borderWidth: 3,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible} className="hiddenState">
                <b>{blog.title} ({blog.likes})</b> <button onClick={toggleVisibility} className="showButton">details</button>
            </div>
            <div style={showWhenVisible} className="shownState">
                <b>{blog.title}</b><br/>
            url: {blog.url} <br/>
                {blog.likes} likes <button onClick={updateLikes} className="likeButton">like</button><br/>
                <i>author: {blog.author}</i><br/>
                <button onClick={toggleVisibility}>hide</button><br/>
                <button onClick={removeEntry} className="removeButton">remove</button>
                <h5>Comments ({blog.comments.length})</h5>
                <ul>
                    {blog.comments.map(comment => <li key={getRandomKey()}>{comment}</li>)}
                </ul>
                <form>
                    <input {...comment.inputValues} /><br/>
                    <button type="submit" onClick={addComment}>add comment</button>
                </form>
            </div>
        </div>
    )
}

export default BlogEntry
