/* eslint-disable react/prop-types */

export const PersonsList = ({ filteredPersons }) => {
  console.log(filteredPersons)
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          <p>
            Name: {person.name} Number: {person.number}
          </p>
        </li>
      ))}
    </ul>
  );
};
