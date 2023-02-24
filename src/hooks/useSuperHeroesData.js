import { useQuery, useMutation } from "react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const useSupeheroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes", //key
    fetchSuperHeroes, //Promise
    {
      // cacheTime: 5000, //5 seconds cache => only keep cache for 5 seconds
      // staleTime: 5000, //10 seconds stale => if cache is older than 10 seconds, then fetch again
      // refetchOnMount: true, //Refetch on mount
      // refetchOnWindowFocus: true, //Refetch on window focus => should click the tab to refetch
      refetchInterval: 1000, //Refetch every 5 seconds automatically - like real time
      refetchIntervalInBackground: true, //Refetch in background - Reftch even if the tab is not active
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

const addSuperhero = async (newSuperHero) => {
  return axios.post("http://localhost:4000/superheroes", newSuperHero);
};

export const useAddSuperheroData = () => {
  return useMutation(addSuperhero);
};
