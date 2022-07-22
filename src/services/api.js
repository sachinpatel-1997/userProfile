import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5001",
  withCredentials: false,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    
  },
});

