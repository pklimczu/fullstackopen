import React from "react"

const Numbers = ({persons, filter}) => {
    return <div>
        <h2>Numbers</h2>
        { persons.filter(person => person.name.includes(filter) )
                 .map(person => <p key={person.name}>{person.name} {person.phone}</p>) }
    </div>
}

export default Numbers