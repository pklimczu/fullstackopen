import blogsService from '../services/blogsService'

const blogsReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT_BLOG':
        return action.data
    case 'NEW_ENTRY':
        return [...state, action.data]
    case 'LIKE_BLOG':
        return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    case 'DELETE_BLOG':
        return state.filter(blog => blog.id !== action.data)
    case 'UPDATE_BLOG':
        return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    default:
        return state
    }
}

export const addBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogsService.create(content)
        dispatch({
            type: 'NEW_ENTRY',
            data: newBlog
        })
    }
}

export const initializeBlog = () => {
    return async dispatch => {
        const blogs = await blogsService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            data: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const newEntry = {
            ...blog,
            likes: blog.likes + 1
        }
        delete newEntry.user
        const response = await blogsService.update(blog.id, newEntry)
        if (response) {
            dispatch({
                type: 'LIKE_BLOG',
                data: newEntry
            })
        }
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        const status = await blogsService.remove(id)
        if (status === 204) {
            dispatch({
                type: 'DELETE_BLOG',
                data: id
            })
        }
        return status
    }
}

export const addCommentToBlog = (blog) => {
    return async dispatch => {
        await blogsService.update(blog.id, blog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: blog
        })
    }
}

export default blogsReducer