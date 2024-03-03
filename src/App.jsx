/* eslint-disable react/prop-types */
import { useState } from 'react';

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
    { name: 'Arto Hellas', phone: '12312312312' },
  ]);

  const addPerson = (newPerson) => {
    setPersons([...persons, newPerson]);
  };

  const checkName = (newName) => {
    return persons.some((person) => person.name === newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} checkName={checkName} />
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>
            <p>Name: {person.name} Phone: {person.phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
