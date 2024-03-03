/* eslint-disable react/prop-types */
export const Filter = ({ handleFilter }) => {
  return (
    <div>
        Find by Name:
      <input
        type="text"
        onChange={(event) => handleFilter(event.target.value)}
      />
    </div>
  );
};
