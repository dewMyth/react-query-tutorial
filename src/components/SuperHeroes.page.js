import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/superheroes").then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
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
