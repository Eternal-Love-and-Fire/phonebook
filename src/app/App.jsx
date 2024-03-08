/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Filter, Form, PersonsList } from "../components";
import { create, getAll } from "../services";

const App = () => {
  const [persons, setPersons] = useState();
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    getAll()
      .then((result) => {
        setPersons(result);
        setFilteredPersons(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterPersons = (filteredName) => {
    setFilteredPersons(
      persons.filter((person) =>
        person.name.toLowerCase().includes(filteredName.toLowerCase())
      )
    );
  };
  const submitPerson = (event) => {
    event.preventDefault();

    const personName = event.target.name.value;
    const personPhone = event.target.phone.value;

    if (persons.some((person) => person.name === personName)) {
      alert(personName + " already added to phonebook");
      return;
    }

    addPerson({ name: personName, number: personPhone });
  };

  const addPerson = (newPerson) => {
    newPerson.id = +persons[persons.length - 1].id + 1;

    const updatedPersons = [...persons, newPerson];

    setPersons(updatedPersons);
    setFilteredPersons(updatedPersons);
    create(newPerson);
  };

  return (
    <div>
      {persons ? (
        <>
          <h1>Phonebook</h1>
          <Filter handleFilter={filterPersons} />
          <Form handleSubmit={submitPerson} />
          <h2>Numbers</h2>
          <PersonsList filteredPersons={filteredPersons} />
        </>
      ) : (
        <div>Wait a little</div>
      )}
    </div>
  );
};

export default App;
