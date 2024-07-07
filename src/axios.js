import axios from "axios";

const instance = axios.create({
   //The API (cloud function) URL   
   baseURL: 'http://127.0.0.1:5001/clone-app-43957/us-central1/api'// The API URL 
})
export default instance; 