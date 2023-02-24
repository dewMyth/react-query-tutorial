import { useQuery, useMutation, useQueryClient } from "react-query";
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
      // refetchInterval: 1000, //Refetch every 5 seconds automatically - like real time
      // refetchIntervalInBackground: true, //Refetch in background - Reftch even if the tab is not active
      onSuccess: onSuccess,
      onError: onError,
    }
  );
};

const addSuperhero = async (newSuperHero) => {
  return axios.post("http://localhost:4000/superheroes", newSuperHero);
};

export const useAddSuperheroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperhero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries("super-heroes"); //invalidate the cache -> same string as the key

    //   // Using response an update DOM, instead of a newtwork request(refetch)
    //   queryClient.setQueryData("super-heroes", (oldData) => {
    //     return {
    //       data: [...oldData.data, data.data], //Append new superhero to the list of superheroes
    //     };
    //   });
    // },
    onMutate: async (newSuperHero) => {
      // Update the DOM without a network request
      await queryClient.cancelQueries("super-heroes"); //Cancel any pending queries
      const previousHeroData = queryClient.getQueryData("super-heroes"); //Get the current data
      queryClient.setQueryData("super-heroes", (oldData) => {
        return {
          data: [
            ...oldData.data,
            {
              id: oldData?.data?.length + 1,
              ...newSuperHero,
            },
          ], //Append new superhero to the list of superheroes
        };
      }); //Set the new data
      return previousHeroData; //Return the previous data
    },
    onError: (_error, _newSuperHero, context) => {
      //rollback the changes
      queryClient.setQueryData("super-heroes", context.previousHeroData); //Set the previous data
    },
    onSettled: () => {
      // Send the network request
      queryClient.invalidateQueries("super-heroes"); //invalidate the cache -> same string as the key
    },
  });
};
