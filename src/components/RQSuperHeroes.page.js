import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const RQSuperHeroesPage = () => {
  const result = useQuery(
    "super-heroes", //key
    () => {
      return axios.get("http://localhost:4000/superheroes");
    } //Promise
  );

  // This is the same as above, a common approach
  // const fetchSuperHeroes = async () => {
  //   return await axios.get("http://localhost:4000/superheroes");
  // };
  // const result = useQuery("super-heroes", fetchSuperHeroes);

  // // Result is an object with load of pre-defined properties.
  // console.log(result);

  //we can destruct them
  const { isLoading, error, isError, data } = result;

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
