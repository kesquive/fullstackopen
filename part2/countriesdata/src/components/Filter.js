const Filter = (props) => {
  return (
    <div>
      Find countries
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;
