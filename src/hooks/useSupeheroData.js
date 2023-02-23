import { useQuery } from "react-query";
import axios from "axios";

const fetchASuperhero = async (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSupeheroData = (heroId) => {
  return useQuery(
    ["super-hero", heroId], //Key should consist the dynamic variable as well
    () => fetchASuperhero(heroId)
  ); // When parsing argument it should be an arrow function
};
