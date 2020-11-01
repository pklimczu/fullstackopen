import React, { useEffect, useState } from "react";
import axios from 'axios'
import Adder from "./components/Adder";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", phone: "" });
  const [filter, setFilter] = useState("")

    const personsHook = () => {
      axios.get('http://localhost:3001/persons')
           .then(response => {
             setPersons(response.data)
           })
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.filter(person => person.name === newEntry.name).length > 0) {
            alert(`${newEntry.name} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newEntry))
            setNewEntry({ name: "", phone: "" })
        }
    }

    const onNameChanged = (event) => {
        const entry = {
            ...newEntry,
            name: event.target.value
        }
        setNewEntry(entry)
    }

    const onPhoneChanged = (event) => {
        const entry = {
            ...newEntry,
            phone: event.target.value
        }
        setNewEntry(entry)
    }

    useEffect(personsHook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Adder addPerson={addPerson} entry={newEntry} nameChanged={onNameChanged} phoneChanged={onPhoneChanged} />
      <Numbers persons={persons} filter={filter} />
    </div>
  );
};

export default App;
