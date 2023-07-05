import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => "Deleted successfully")
    .catch((error) => `Error: ${error.message}`);
};

const personService = {
  getAll: getAll,
  create: create,
  remove: remove,
};
export default personService;
