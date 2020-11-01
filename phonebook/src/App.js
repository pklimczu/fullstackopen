import React, { useEffect, useState } from "react";
import noteService from './services/Notes'
import Adder from "./components/Adder";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("")

  const resetEntry = () => {
    setNewEntry({ name: "", number: "" })
  }

    const personsHook = () => {
      noteService.getAll()
           .then(notes => {
             setPersons(notes)
           })
    }

    const addPerson = (event) => {
        event.preventDefault()
        const person = persons.find(person => person.name === newEntry.name)

        if (person) {
            const isConfirmed = window.confirm(`${newEntry.name} is already added to phonebook. Do you want to update?`)
            if (isConfirmed) {
              updatePerson(person)
            }
        } else {
            noteService.create(newEntry)
                       .then(newNote => {
                          setPersons(persons.concat(newNote))
                          resetEntry()
                       })
        }
    }

    const removePerson = (person) => {
      const isConfirmed = window.confirm(`Do you want to delete ${person.name}?`)
      if (isConfirmed) {
        noteService.remove(person.id)
                   .then(() => {
                    setPersons(persons.filter(entry => entry.id !== person.id))
                  })
      }
    }

    const updatePerson = (person) => {
      noteService.update(person.id, newEntry)
                 .then(updated => {
                   setPersons(persons.map(person => person.name === updated.name ? updated : person))
                   resetEntry()
                 })
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
            number: event.target.value
        }
        setNewEntry(entry)
    }

    useEffect(personsHook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <Adder addPerson={addPerson} entry={newEntry} nameChanged={onNameChanged} phoneChanged={onPhoneChanged} />
      <Numbers persons={persons} filter={filter} removeFunc={removePerson} />
    </div>
  );
};

export default App;
