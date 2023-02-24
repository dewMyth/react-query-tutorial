import React, { useState } from "react";
import {
  useSupeheroesData,
  useAddSuperheroData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";

const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const { mutate: addSuperhero } = useAddSuperheroData();

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

  const handleAddHero = (e) => {
    e.preventDefault();
    const newSuperHero = {
      name,
      alterEgo,
    };
    addSuperhero(newSuperHero);
  };

  return (
    <>
      <h1>Super Heroes</h1>

      <form>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero</button>
      </form>

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
