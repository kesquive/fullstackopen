import { React, useState, useEffect } from "react";
import weatherService from "../services/weather";

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const handleShowButton = (event) => {
    setShow(!show);
  };

  return (
    <div>
      <li>
        {country.name.common}
        <button onClick={handleShowButton}> {show ? "Hide" : "Show"} </button>
      </li>
      {show ? (
        <CountryInfo key={country.name.common} country={country} />
      ) : null}
    </div>
  );
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    weatherService
      .get(country.capital)
      .then((response) => {
        if (!response.error) {
          setWeather(response);
          console.log(
            `Current temperature in ${response.location.name} is ${response.current.temperature}℃`
          );
        } else {
          console.log(
            `Response error: code: ${response.error.code}, info: ${response.error.info}`
          );
        }
      })
      .catch((error) => {
        console.error("An error occurred: ", error);
      });
  }, [country.capital]);

  if (weather.length > 0) {
    const currentWeather = weather[0].current;
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
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt=""></img>
        <p>
          Wind: {currentWeather.wind_speed} mph direction{" "}
          {currentWeather.wind_dir}
        </p>
      </div>
    );
  } else {
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
  }
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
