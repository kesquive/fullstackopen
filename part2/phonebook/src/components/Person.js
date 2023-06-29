const Person = (props) => {
  return (
    <li>
      {props.person.name} {props.person.number}
    </li>
  );
};

export default Person;
