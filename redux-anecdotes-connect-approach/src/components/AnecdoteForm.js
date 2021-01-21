import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => 
{
    const add = async (event) => {
        event.preventDefault()
        const newAnecdote = { content: event.target.anecdote.value, votes: 0 }
        event.target.anecdote.value = ''
        props.addAnecdote(newAnecdote)
        props.addNotification(`${newAnecdote.content} has been added`, 5)
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

const ConnectedAnecdoteForm = connect(
    null,
    { addAnecdote, addNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm