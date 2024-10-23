import React, { useEffect, useState } from "react";
import DisplayCards from "../../components/DisplayCards";
import NotAvailable from "../../components/NotAvailable";

const Similar = ({ id }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
      );
      const data = await response.json();
      // console.log('similar', data)
      setSimilar(data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="movie-details-similar">
      <h1>Similar</h1>
      {similar.length > 0 ? (
        <DisplayCards data={similar} swiper="include" />
      ) : (
        <NotAvailable item="Similar" />
      )}
    </div>
  );
};

export default Similar;
