import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(state => state.anecdotes
        .filter(a => a.content.toLowerCase()
                        .includes(state.filter.toLowerCase())))
    const dispatch = useDispatch()

    const vote = (id) => {
        const toUpdate = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteForAnecdote(toUpdate))
        dispatch(addNotification(`"${toUpdate.content}" has been voted`, 5))
        
    }

    return <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
        )}
    </div>
}

export default AnecdoteList