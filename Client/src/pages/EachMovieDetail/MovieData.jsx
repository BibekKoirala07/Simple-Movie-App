import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import minutesToHoursAndMinutes from "../../utils/minutesToHours";
import extractPositions from "../../utils/extractPositions";
import { toast } from "react-toastify";
import { toastFailure, toastSuccess } from "../../utils/toastify";
import { useDispatch, useSelector } from "react-redux";
import { favouriteDelete, favouriteAdd } from "../../store";

const imagePath = `https://image.tmdb.org/t/p/w500/`;

const MovieData = (props) => {
  const dispatch = useDispatch();
  const { data, crew, media_type } = props;

  const user = useSelector((state) => {
    return state.user.user;
  });

  const ids = useSelector((state) => {
    return state.favourites.favourites.map((each) => each.id);
  });

  const url =
    import.meta.env.VITE_NODE_ENV == "production"
      ? import.meta.env.VITE_PROD_BACKEND_URL
      : import.meta.env.VITE_DEV_BACKEND_URL;

  const handleAddFavourite = async () => {
    console.log(
      user._id,
      props.data.poster_path,
      media_type,
      props.data.backdrop_path,
      props.data.release_date
    );
    try {
      const response = await fetch(`${url}/user/add-favourite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user._id,
          id: data.id,
          title: data.original_title,
          media_type: data.media_type || "",
          release_date: data.release_date,
          poster_path: data.poster_path,
          backdrop_path: data.backdrop_path,
        }),
      });

      const responseData = await response.json();
      console.log("data", responseData);
      if (response.ok) {
        toast.success("Added to Favourite", toastSuccess);
        dispatch(favouriteAdd(responseData.data));
      } else {
        throw Error(responseData.error);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Unable to add to Favourite", toastFailure);
    }
  };

  const handleDeleteFavourite = async () => {
    const fullUrl = `${url}/user/delete-favourite/${data.id}`;
    try {
      const response = await fetch(fullUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user._id }),
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        toast.success("Removed from favourites", toastSuccess);
        dispatch(favouriteDelete(data.id));
      } else {
        throw Error("Some error occurred");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(data.error, toastFailure);
    }
  };

  const EachMovieDataDetails = () => {
    const genresData = data.genres.map((each) => {
      return (
        <div
          style={{
            background: "inherit",
            padding: "0.1em",
            marginBlock: "0.1em",
            display: "inline-block",
          }}
        >
          <span
            key={each.id}
            style={{
              marginRight: "0.2em",
              marginBlock: "0.1em",
              borderRadius: "0.2em",
              padding: "0.1em 0.2em",
            }}
          >
            {each.name}
          </span>
        </div>
      );
    });

    return (
      <div className="each-movie-data-details">
        <h1>{data.original_title}</h1>
        <p>{data.tagline || "Unknown description"}</p>
        <div>{genresData || "Unknown genres"}</div>
        <div className="each-movie-data-details-stats">
          <div className="circular-progress-bar">
            <CircularProgressbar
              value={data.vote_average.toFixed(1)}
              text={data.vote_average.toFixed(1)}
              minValue={0}
              maxValue={10}
              strokeWidth={16}
              styles={buildStyles({
                pathColor:
                  data.vote_average < 5
                    ? "red"
                    : data.vote_average < 7
                    ? "orange"
                    : "green",
                textSize: "px",
                textColor: "white",
              })}
            />
          </div>
          <button className="watch-trailer">
            <i className="fa-solid fa-video fa-2x"></i>
            Watch Trailer
          </button>

          <div
            className="each-movie-data-add-favourite"
            onClick={() =>
              !ids.includes(`${data.id}`)
                ? handleAddFavourite()
                : handleDeleteFavourite()
            }
          >
            <i
              className="fa-solid fa-heart"
              style={{ color: ids.includes(`${data.id}`) ? "red" : "grey" }}
            ></i>
          </div>
        </div>

        <div className="each-movie-data-details-overview">
          <h3>Overview</h3>
          <p>{data.overview}</p>
        </div>

        <div className="each-movie-data-details-status">
          <h3>
            Status: <span>{data.status || "Unknown"}</span>
          </h3>
          <h3>
            Release-Date: <span>{data.release_data || "Unknown"}</span>{" "}
          </h3>
          <h3>
            Runtime:{" "}
            <span>{minutesToHoursAndMinutes(data.runtime) || "Unknown"}</span>{" "}
          </h3>
        </div>

        <div>
          <h3>
            Director:{" "}
            <span>{extractPositions(crew, `Director`) || "Unknown"}</span>
          </h3>
        </div>

        <div>
          <h3>
            Writer: <span>{extractPositions(crew, `Writer`) || "Unkown"}</span>{" "}
          </h3>
        </div>
      </div>
    );
  };

  if (data.length !== 0) {
    return (
      <div
        className="each-movie-data"
        style={{ marginInline: "auto", gap: "2em" }}
      >
        <div className="each-movie-data-image">
          <img
            src={
              data.poster_path
                ? imagePath + data.poster_path
                : data.backdrop_path
                ? imagePath + data.backdrop_path
                : "/OIP.jpg"
            }
            alt=""
          />
        </div>
        <EachMovieDataDetails />
      </div>
    );
  }
};

export default MovieData;
