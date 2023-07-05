const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.id)}>Delete</button>
    </li>
  );
};

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} deletePerson={deletePerson} />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
