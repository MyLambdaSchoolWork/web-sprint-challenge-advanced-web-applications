import axios from "axios";

//Task List:
//Build and export a function used to send in our authorization token

export default function axiosWithAuth(){
  const token = localStorage.getItem('not_a_secret_token')

  return axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      authorization: token
    }
  })
}