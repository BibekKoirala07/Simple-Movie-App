import React, { useEffect, useState } from "react";
import DisplayCards from "../../components/DisplayCards";

import "./Movies.css";

const Movies = () => {
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);

  const [genres, setGenres] = useState("");
  const [sort, setSort] = useState("");

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
    let fullURL = url;

    let addAnd = 0;

    if (genres) {
      if (addAnd == 0) {
        addAnd++;
        fullURL = fullURL + `&with_genres=${genres.key}`;
      }
    }
    if (sort) {
      if (addAnd == 0) {
        fullURL = fullURL + `&sort_by=${sort.id}`;
      } else if (addAnd == 1) {
        fullURL = fullURL + `&sort_by=${sort.id}`;
      }
      addAnd++;
    }

    const fetchData = async () => {
      const repsonse = await fetch(fullURL);
      const data = await repsonse.json();
      setData(data.results);
    };
    fetchData();
  }, [apiKey, sort, genres.name, page]);

  const handleGenres = (e) => {
    if (e.target.value == "") {
      return setGenres("");
    }
    const selectedValue = JSON.parse(e.target.value);
    setPage(1);
    setGenres(selectedValue);
  };

  const handleSort = (e) => {
    if (e.target.value == "") {
      return setSort("");
    }

    const selectedValue = JSON.parse(e.target.value);
    setPage(1);
    setSort(selectedValue);
  };

  const handlePage = (clickPage) => {
    setPage(() => {
      return clickPage;
    });
  };

  const MoviesHeading = () => {
    return (
      <div className="movies-heading">
        <h2>Explore Movies</h2>
        <div>
          <h3>{genres.name ? genres.name : "Select by genres"}</h3>
          <select
            name=""
            id=""
            onChange={handleGenres}
            value={JSON.stringify(genres)}
          >
            <option value="">Select by Genres: </option>
            <option value={JSON.stringify({ key: 28, name: "Action" })}>
              Action
            </option>
            <option value={JSON.stringify({ key: 12, name: "Adventure" })}>
              Adventure
            </option>
            <option value={JSON.stringify({ key: 16, name: "Animation" })}>
              Animation
            </option>
            <option value={JSON.stringify({ key: 35, name: "Comedy" })}>
              Comedy
            </option>
            <option value={JSON.stringify({ key: 80, name: "Crime" })}>
              Crime
            </option>
            <option value={JSON.stringify({ key: 99, name: "Documentary" })}>
              Documentary
            </option>
            <option value={JSON.stringify({ key: 18, name: "Drama" })}>
              Drama
            </option>
            <option value={JSON.stringify({ key: 10751, name: "Family" })}>
              Family
            </option>
            <option value={JSON.stringify({ key: 14, name: "Fantasy" })}>
              Fantasy
            </option>
          </select>
        </div>
        <div>
          <h3>{sort.name ? sort.name : "Select by Order"}</h3>
          <select name="" id="" onChange={handleSort}>
            <option value="">Select by Order</option>
            <option
              value={JSON.stringify({
                name: `Descending Popularity`,
                id: `popularity.desc`,
              })}
            >
              Popularity Descending
            </option>
            <option
              value={JSON.stringify({
                name: `Ascending Popularity`,
                id: `popularity.aesc`,
              })}
            >
              Popularity Ascending
            </option>
            <option
              value={JSON.stringify({
                name: `Revenue Descending`,
                id: `revenue.desc`,
              })}
            >
              Revenue Descending
            </option>
            <option
              value={JSON.stringify({
                name: `Revenue Ascending`,
                id: `revenue.aesc`,
              })}
            >
              Revenue Ascending
            </option>
            <option
              value={JSON.stringify({
                name: `Rating Descending`,
                id: `rating.desc`,
              })}
            >
              Rating Descending
            </option>
            <option
              value={JSON.stringify({
                name: `Rating Ascending`,
                id: `rating.aesc`,
              })}
            >
              Rating Ascending
            </option>
            <option
              value={JSON.stringify({
                name: `Popularity Descending`,
                id: `vote_average.desc`,
              })}
            >
              Popularity Descending
            </option>
            <option
              value={JSON.stringify({
                name: `Popularity Ascending`,
                id: `vote_average.aesc`,
              })}
            >
              Popularity Ascending
            </option>
            <option
              value={JSON.stringify({
                name: `Release Date Descending`,
                id: `primary_release_date.desc`,
              })}
            >
              Release Date Descending
            </option>
            <option
              value={JSON.stringify({
                name: `Release Date Ascending`,
                id: `primary_release_date.aesc`,
              })}
            >
              Release Date Ascending
            </option>
            <option value="">Title(A-Z)</option>
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="movies">
      <MoviesHeading />
      <DisplayCards data={data} swiper="not-include" />
      <div className="movies-button">
        {page - 2 > 0 && (
          <button onClick={() => handlePage(page - 2)}>{page - 2}</button>
        )}
        {page - 1 > 0 && (
          <button onClick={() => handlePage(page - 1)}>{page - 1}</button>
        )}
        <button style={{ background: "red" }} onClick={() => handlePage(page)}>
          {page}
        </button>
        <button onClick={() => handlePage(page + 1)}>{page + 1}</button>
        <button onClick={() => handlePage(page + 2)}>{page + 2}</button>
      </div>
    </div>
  );
};

export default Movies;
