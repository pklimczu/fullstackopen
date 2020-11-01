import React, { useEffect, useState } from "react";
import noteService from "./services/Notes";
import Adder from "./components/Adder";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ message: null, isError: false });

  const resetEntry = () => {
    setNewEntry({ name: "", number: "" });
  };

  const resetNotification = () => {
    setNotification({ message: null, isError: false })
  };

  const defineNotification = (msg, isErr) => {
    setNotification({ message: msg, isError: isErr });
    setTimeout(() => {
      resetNotification()
    }, 5000)
  }

  const personsHook = () => {
    noteService.getAll().then((notes) => {
      setPersons(notes);
    });
  };

  const addPerson = (event) => {
    event.preventDefault();
    const person = persons.find((person) => person.name === newEntry.name);

    if (person) {
      const isConfirmed = window.confirm(
        `${newEntry.name} is already added to phonebook. Do you want to update?`
      );
      if (isConfirmed) {
        updatePerson(person);
      }
    } else {
      noteService.create(newEntry).then((newNote) => {
        setPersons(persons.concat(newNote));
        defineNotification(`${newNote.name} is added`, false)
        resetEntry();
      });
    }
  };

  const removePerson = (person) => {
    const isConfirmed = window.confirm(`Do you want to delete ${person.name}?`);
    if (isConfirmed) {
      noteService.remove(person.id)
                 .then(() => {
                    setPersons(persons.filter((entry) => entry.id !== person.id));
                    defineNotification(`${person.name} is removed`, false)
                  }).catch(error => {
                    console.log(error);
                    setPersons(persons.filter((entry) => entry.id !== person.id));
                    defineNotification("Oops, something went wrong when removing", true)
                  })
    }
  };

  const updatePerson = (person) => {
    noteService.update(person.id, newEntry).then((updated) => {
      setPersons(
        persons.map((person) => 
          person.name === updated.name ? updated : person
        )
      );
      defineNotification(`${person.name} is updated`, false)
      resetEntry();
    });
  };

  const onNameChanged = (event) => {
    const entry = {
      ...newEntry,
      name: event.target.value,
    };
    setNewEntry(entry);
  };

  const onPhoneChanged = (event) => {
    const entry = {
      ...newEntry,
      number: event.target.value,
    };
    setNewEntry(entry);
  };

  useEffect(personsHook, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <Adder
        addPerson={addPerson}
        entry={newEntry}
        nameChanged={onNameChanged}
        phoneChanged={onPhoneChanged}
      />
      <Numbers persons={persons} filter={filter} removeFunc={removePerson} />
    </div>
  );
};

export default App;
