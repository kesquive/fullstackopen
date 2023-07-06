import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const exist = isExist();
    if (exist) {
      if (
        window.confirm(
          `${newName} is already added, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personService
          .update(changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.name !== newName ? p : returnedPerson))
            );
            setNotificationMessage({
              type: "success",
              message: `${returnedPerson.name}'s number was updated.`,
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setNotificationMessage({
              type: "error",
              message: "not implemented yet",
            });
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNotificationMessage({
            type: "success",
            message: `Added ${returnedPerson.name}`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setNotificationMessage({
            type: "error",
            message: "not implemented yet",
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
  };

  const deletePerson = (id) => {
    if (window.confirm("Are you sure?")) {
      const deletedPerson = persons.filter((p) => p.id === id);
      personService
        .remove(id)
        .then(() => {
          setNotificationMessage({
            type: "success",
            message: `${deletedPerson[0].name} was deleted.`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setNotificationMessage({
            type: "error",
            message: `Informaton ${deletedPerson[0].name} of has already been removed from server.`,
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });

      setPersons(persons.filter((p) => p.id !== id));
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
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <Notification notification={notificationMessage} />
      <PersonForm
        submit={addPerson}
        name={newName}
        handleName={handleNameChange}
        number={newNumber}
        handleNumber={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
