import React from "react"

const Numbers = ({persons, filter, removeFunc}) => {
    return <div>
        <h2>Numbers</h2>
        { persons.filter(person => person.name.includes(filter) )
                 .map(person => 
                    <p key={person.id}>{person.name} {person.number} <button onClick={() => removeFunc(person)}>delete</button></p>
                    ) }
    </div>
}

export default Numbers