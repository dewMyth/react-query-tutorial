import React from "react";
import { useQueries } from "react-query";
import axios from "axios";

const fetchASuperhero = async (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

const DynamicParallelQueries = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((heroId) => ({
      queryKey: ["superhero", heroId],
      queryFn: () => fetchASuperhero(heroId),
    }))
  );
  console.log(queryResults);
  return <div>DynamicParallelQueries</div>;
};

export default DynamicParallelQueries;
