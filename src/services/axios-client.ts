import axios, { AxiosInstance } from "axios";

const apiURL = "https://dash.mayrahkeeafrica.com/api";

export const axiosClient = (token: string | null): AxiosInstance => {
  let headers;

  if(token){
   headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": `Bearer ${token}`,
    }
  } else{
    headers = {
      "Content-Type": "application/json;charset=utf-8",
    };
  
  }
  const client = axios.create({
    baseURL: apiURL,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  return client;
};
