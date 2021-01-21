import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const content = event.target.value
        props.changeFilter(content)
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

const ConnectedFilter = connect(
    null,
    { changeFilter }
)(Filter)
export default ConnectedFilter