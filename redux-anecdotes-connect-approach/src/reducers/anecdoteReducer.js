import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'VOTE':
            return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
                        .sort((a1, a2) => a2.votes - a1.votes)
        case 'ADD':
            return state.concat(action.data)
        case 'INIT_NOTES':
            return action.data
        default:
            return state
    }
}

export const voteForAnecdote = (anecdote) => {
    const newAnecdote = {...anecdote, votes: anecdote.votes + 1}

    return async dispatch => {
        const updated = await anecdoteService.updateAnecdote(newAnecdote)
        dispatch({
            type: 'VOTE',
            data: updated
        })
    }
}

export const addAnecdote = (anecdote) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch({
            type: 'ADD',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_NOTES',
            data: anecdotes.sort((a1, a2) => a2.votes - a1.votes)
        })
    }
}

export default reducer