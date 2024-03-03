/* eslint-disable react/prop-types */
import { useState } from 'react';

const PersonSearchBar = ({filteredFunction}) => {

    return (
        <div>
            <input type="text" onChange={(event) => filteredFunction(event.target.value)} />
        </div>
    )
}

const PersonForm = ({ addPerson, checkName }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (checkName(name)) {
      alert(`${name} is already added to the phonebook`);
      return;
    }

    addPerson({ name, phone });
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Name: 
        <input
          type='text'
          id='name'
          placeholder='Enter name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor='phone'>
        Phone:
        <input
          type='tel'
          id='phone'
          placeholder='Enter phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);

  const filterPersons = (filteredName) => {
    const result = persons.filter((person) =>
    {
        const name = person.name.toLowerCase();
        const filname = filteredName.toLowerCase();
       return name.includes(filname)
    });
    console.log(result);
    setFilteredPersons(result);
  }

  const addPerson = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  const checkName = (newName) => {
    return persons.some((person) => person.name === newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonSearchBar filteredFunction={filterPersons}/>
      <PersonForm addPerson={addPerson} checkName={checkName} />
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            <p>Name: {person.name} Phone: {person.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
