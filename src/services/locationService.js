import { useContext } from "react";
import { AuthContext } from "../context/AuthContex";
import { axiosClient } from "./axios-client";

export const useLocationService = () => {
  const { authDetails } = useContext(AuthContext);
  const client = axiosClient(authDetails?.token);

  return {
    // Country APIs
    getCountries: (includeAll = false) =>
      client.get(`/location/countries${includeAll ? "?include_all=true" : ""}`),

    createCountry: (data) => client.post("/location/countries", data),
    updateCountry: (id, data) => client.put(`/location/countries/${id}`, data),
    deleteCountry: (id) => client.delete(`/location/countries/${id}`),

    // State APIs
    getStates: (includeAll = false) =>
      client.get(`/location/states${includeAll ? "?include_all=true" : ""}`),

    createState: (data) => client.post("/location/states", data),
    updateState: (id, data) => client.put(`/location/states/${id}`, data),
    deleteState: (id) => client.delete(`/location/states/${id}`),

    // LGA APIs
    getLGAs: (includeAll = false) =>
      client.get(`/location/lgas${includeAll ? "?include_all=true" : ""}`),

    createLGA: (data) => client.post("/location/lgas", data),
    updateLGA: (id, data) => client.put(`/location/lgas/${id}`, data),
    deleteLGA: (id) => client.delete(`/location/lgas/${id}`),
  };
};
