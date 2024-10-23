import React, { useEffect, useState } from "react";
import DisplayCards from "../../components/DisplayCards";
import NotAvailable from "../../components/NotAvailable";

const Recommendation = ({ id }) => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [recommendation, setRecommendation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}`
      );
      const data = await response.json();
      setRecommendation(data.results);
    };
    fetchData();
  }, []);

  return (
    <div className="movie-detail-recommendation">
      <h1>Recommendation</h1>
      <div>
        {recommendation.length > 0 ? (
          <DisplayCards data={recommendation} swiper="include" />
        ) : (
          <NotAvailable item="Recommendation" />
        )}
      </div>
    </div>
  );
};

export default Recommendation;
