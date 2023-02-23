import React from "react";
import { useSupeheroesData } from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

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
          <div>
            <Link key={hero.id} to={`/super-heroes/${hero.id}`}>
              {hero.name}
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default RQSuperHeroesPage;
