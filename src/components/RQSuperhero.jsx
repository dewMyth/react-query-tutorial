import React from "react";
import { useParams } from "react-router-dom";
import { useSupeheroData } from "../hooks/useSupeheroData";

const RQSuperhero = () => {
  const { heroId } = useParams();

  const { isLoading, isError, data, error } = useSupeheroData(heroId);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {data?.data.name} - {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperhero;
