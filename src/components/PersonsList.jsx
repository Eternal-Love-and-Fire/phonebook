/* eslint-disable react/prop-types */

export const PersonsList = ({ filteredPersons }) => {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.name}>
          <p>
            Name: {person.name} Phone: {person.phone}
          </p>
        </li>
      ))}
    </ul>
  );
};
