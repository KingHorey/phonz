import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:400",
});

export default myAxios;
