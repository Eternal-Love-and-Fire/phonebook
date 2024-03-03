/* eslint-disable react/prop-types */
import { useState } from "react";
import { Filter, Form, PersonsList } from "./components";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const filterPersons = (filteredName) => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().includes(filteredName.toLowerCase())
    );
    setFilteredPersons(result);
  };
  const submitPerson = (event) => {
    event.preventDefault();
    const { target } = event;

    const personName = target.name.value;
    const personPhone = target.phone.value;

    if (checkName(personName)) {
      alert(personName + " already added to phonebook");
      return;
    }

    addPerson({ name: personName, phone: personPhone });
  };

  const addPerson = (newPerson) => {
    const updatedPersons = [...persons, newPerson];

    setPersons(updatedPersons);
    setFilteredPersons(updatedPersons);
  };

  const checkName = (newName) =>
    persons.some((person) => person.name === newName);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilter={filterPersons} />
      <Form handleSubmit={submitPerson} />
      <h2>Numbers</h2>
      <PersonsList filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
