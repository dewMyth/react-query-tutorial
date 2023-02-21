import React from "react";
import { useSupeheroesData } from "../hooks/useSuperHeroesData";

const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    console.log("Success", data);
  };

  const onError = (error) => {
    console.log("Error", error);
  };

  //we can destruct from useSuperHeroesData hook
  const { isLoading, isFetching, error, isError, data } = useSupeheroesData(
    onSuccess,
    onError
  );

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
