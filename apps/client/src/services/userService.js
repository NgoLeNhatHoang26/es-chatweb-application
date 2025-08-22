// services/userService.js
import axios from "axios";
export const fetchUsers = () =>
  axios.get("http://localhost:3001/users").then(res => res.data);