import React from 'react'
import { useDispatch } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        dispatch(changeFilter(content))
    }

    const style = {
        marginBottom: 10
    }

  return (
    <div style={style}>
        filter <input name="filterInput" onChange={handleChange} />
    </div>
    )
}

export default Filter