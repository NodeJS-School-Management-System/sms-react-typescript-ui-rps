import axios from "axios";
const PF = import.meta.env.VITE_REACT_APP_NEW_MONGO_API;
export const myAPIClient = axios.create({
  baseURL: `${PF}`,
});

export const MongoAPIClient = import.meta.env.VITE_REACT_APP_MONGODB_API_URL;
