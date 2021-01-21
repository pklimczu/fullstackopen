import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => 
{
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const newAnecdote = { content: event.target.anecdote.value, votes: 0 }
        event.target.anecdote.value = ''
        dispatch(addAnecdote(newAnecdote))
        dispatch(addNotification(`${newAnecdote.content} has been added`, 5))
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={add}>
            <div>
                <input name="anecdote"/>
            </div>
            <button type="submit">create</button>
        </form>
        <br/>
    </div>
}

export default AnecdoteForm