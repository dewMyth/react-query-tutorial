import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = async () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = async () => {
  return axios.get("http://localhost:4000/friends");
};

const ParellelQueries = () => {
  const { data: superheroes } = useQuery("superheroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);

  return <div>Parellel Data</div>;
};

export default ParellelQueries;
