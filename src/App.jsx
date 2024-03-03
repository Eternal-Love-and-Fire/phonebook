import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const name = event.target.name.value;

    if(checkName(name)){
        alert(name + 'is already added to phonebook')
        return;
    }

    setPersons([...persons, {name}])
    
    setNewName()
  }
  const checkName = (newName) => {
    console.log(persons.find((person) => person.name === newName))
    return persons.find((person) => person.name === newName);

  }
  console.log(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name='name'/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
            persons.map((person) => {
                return <li key={person.name}>{person.name}</li>
            })
        }
      </ul>
    </div>
  )
}

export default App