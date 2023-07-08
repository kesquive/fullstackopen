import axios from "axios";

const get = (capital) => {
  const params = {
    access_key: process.env.REACT_APP_WEATHER_API_KEY,
    query: capital,
  };
  const request = axios.get("http://api.weatherstack.com/current", { params });
  return request.then((response) => response.data);
};

const weatherService = {
  get,
};
export default weatherService;
