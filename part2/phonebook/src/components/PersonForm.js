const PersonForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
        Name: <input value={props.name} onChange={props.handleName} required />
      </div>
      <div>
        Number:
        <input value={props.number} onChange={props.handleNumber} required />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
