import React from "react";

const Country = ({ country }) => {
  return <li>{country.name.common}</li>;
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} width="100" height="100" alt="" />
    </div>
  );
};

const Countries = ({ countries, filter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  if (Object.keys(filteredCountries).length > 10) {
    return "Too many matches, specify another filter";
  } else if (
    Object.keys(filteredCountries).length > 1 &&
    Object.keys(filteredCountries).length < 10
  ) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <Country key={country.name.common} country={country} />
        ))}
      </ul>
    );
  } else if (Object.keys(filteredCountries).length === 1) {
    return (
      <CountryInfo
        key={filteredCountries[0].name.common}
        country={filteredCountries[0]}
      />
    );
  }
};

export default Countries;
