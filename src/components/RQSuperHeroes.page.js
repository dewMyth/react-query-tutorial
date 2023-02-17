import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const RQSuperHeroesPage = () => {
  const result = useQuery(
    "super-heroes", //key
    () => {
      return axios.get("http://localhost:4000/superheroes");
    }, //Promise
    {
      // cacheTime: 5000, //5 seconds cache => only keep cache for 5 seconds
      staleTime: 5000, //10 seconds stale => if cache is older than 10 seconds, then fetch again
      refetchOnMount: true, //Refetch on mount
      refetchOnWindowFocus: true, //Refetch on window focus => should click the tab to refetch
    }
  );

  // This is the same as above, a common approach
  // const fetchSuperHeroes = async () => {
  //   return await axios.get("http://localhost:4000/superheroes");
  // };
  // const result = useQuery("super-heroes", fetchSuperHeroes);

  // // Result is an object with load of pre-defined properties.
  // console.log(result);

  //we can destruct them
  const { isLoading, isFetching, error, isError, data } = result;

  console.log("Loading...", isLoading);
  console.log("Fetching...", isFetching);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1>Super Heroes</h1>
      {data?.data?.map((hero) => {
        return (
          <div key={hero.id}>
            <h2>{hero.name}</h2>
            <h3>{hero.superheroName}</h3>
            <p>{hero.description}</p>
          </div>
        );
      })}
    </>
  );
};

export default RQSuperHeroesPage;
