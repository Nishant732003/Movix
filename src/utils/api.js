import axios from "axios";

const BaseURL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  Authorization: "Bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BaseURL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
