const Person = (props) => {
  return (
    <li>
      {props.person.name} {props.person.number}
    </li>
  );
};

const Persons = (props) => {
  return (
    <div>
      <ul>
        {props.persons.map((person) => (
          <Person key={person.name} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
