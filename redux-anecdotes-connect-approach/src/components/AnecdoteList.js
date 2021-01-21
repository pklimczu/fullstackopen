import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

    const vote = (id) => {
        const toUpdate = props.anecdotes.find(anecdote => anecdote.id === id)
        props.voteForAnecdote(toUpdate)
        props.addNotification(`"${toUpdate.content}" has been voted`, 5)
    }

    return <div>
        {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes.filter(a => a.content.toLowerCase()
                                  .includes(state.filter.toLowerCase()))
    }
}

const mapDispatchToProps = {
    voteForAnecdote,
    addNotification
}

const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList