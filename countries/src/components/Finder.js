import React from 'react';

const Finder = ({search, setSearch}) => {

    const onValueChanged = (event) => {
        event.preventDefault()
        setSearch(event.target.value)
    }

    return <div>
        find countries <input value={search} onChange={onValueChanged} />
    </div>
}

export default Finder