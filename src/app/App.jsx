/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Filter, Form, PersonsList } from "../components";
import { create, getAll } from "../services";
import { deleteById, update } from "../services/notes";

const App = () => {
  const [persons, setPersons] = useState();
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [successMessage, setSuccessMessage] = useState(false);

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

    const name = event.target.name.value;
    const number = event.target.phone.value;

    const personData = persons.find((person) => person.name === name);

    if (personData) {
      personData.number = number;
      editPerson(personData);
    } else {
      console.log("asdasd");
      const person = {
        name,
        number,
        id: `${+persons[persons.length - 1].id + 1}`,
      };
      addPerson(person);
    }
  };

  const editPerson = (person) => {
    const newPersons = persons.map((item) => {
      if (person.name === item.name) {
        console.log("asda");

        return person;
      }
      return item;
    });

    setPersons(newPersons);
    setFilteredPersons(newPersons);
    update(person.id, person);
  };

  const addPerson = (newPerson) => {
    const updatedPersons = [...persons, newPerson];

    setPersons(updatedPersons);
    setFilteredPersons(updatedPersons);
    create(newPerson);

    setSuccessMessage(!successMessage);
    setTimeout(() => {
      setSuccessMessage(false);
    }, 3000);
  };
  const handleDelete = (id) => {
    const users = persons.filter((item) => item.id !== id);
    setPersons(users);
    setFilteredPersons(users);
    deleteById(id);
  };
  console.log(successMessage);
  return (
    <div>
      {persons ? (
        <>
          <h1>Phonebook</h1>
          {successMessage ? (
            <p
              style={{
                backgroundColor: "green",
                color: "blue",
                fontSize: "2rem",
              }}
            >
              Added successfuly
            </p>
          ) : (
            ""
          )}
          <Filter handleFilter={filterPersons} />
          <Form handleSubmit={submitPerson} />
          <h2>Numbers</h2>
          <PersonsList
            filteredPersons={filteredPersons}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        <div>Wait a little</div>
      )}
    </div>
  );
};

export default App;
