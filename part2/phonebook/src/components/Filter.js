const Filter = (props) => {
  return (
    <div>
      Filter shown with
      <input value={props.filter} onChange={props.handleFilter} />
    </div>
  );
};

export default Filter;
