import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newNote) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newNote, config);
  return response.data;
};

const blogService = { getAll, setToken, create };
export default blogService;
