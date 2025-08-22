import axios from "axios";

export const fetchMessages = (params) =>
  axios.get("http://localhost:3001/messages", { params })
    .then(res => res.data);