import axios from "axios";

const axiosIntence = axios.create({
  baseURL: import.meta.VITE_BACKEND_URL,
  withCredentials: true, //By adding this field browser will send the cookies to the server every time automatically
});

export default axiosIntence;
