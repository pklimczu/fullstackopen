import React from "react";

const Filter = ({filter, setFilter}) => {

    const onFilterChanged = (event) => {
        event.preventDefault()
        setFilter(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }

    return <form onSubmit={onSubmit}>
        <span>filter shown with </span>
        <input value={filter} onChange={onFilterChanged}></input>
    </form>
}

export default Filter