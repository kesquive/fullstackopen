import { useState } from "react";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const personToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const exist = isExist();
    if (exist) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const isExist = () => {
    return persons.some((person) => person.name === newName);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      Filter shown with <input value={filter} onChange={handleFilter} />
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} required />
        </div>
        <div>
          Number:
          <input value={newNumber} onChange={handleNumberChange} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {personToShow.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
