import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Filter from "./components/Filter";
import countryService from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
