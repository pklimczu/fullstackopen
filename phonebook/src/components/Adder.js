import React from "react";

const Adder = ({ addPerson, entry, nameChanged, phoneChanged }) => {
  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={entry.name} onChange={nameChanged} />
        </div>
        <div>
          number: <input value={entry.number} onChange={phoneChanged} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Adder;
