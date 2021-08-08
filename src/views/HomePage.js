import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// useLocation;
// import PropTypes from 'prop-types';
import * as moviesApi from "services/moviesAPI/moviesAPI";
import PageTitle from "components/PageTitle/PageTitle";
import MoviesTrendList from "components/MoviesTrendList/MoviesTrendList";
import s from "./views.module.css";

export default function HomePage(params) {
  const [filmsStartList, setFilmsStartList] = useState([]);
  const [error, setError] = useState("");
  // const location = useLocation();

  useEffect(() => {
    searchMoviesFetch();
  }, []);

  const searchMoviesFetch = () => {
    moviesApi
      .fetchTrendingMovies()
      .then(({ results }) => {
        // console.log(results);
        setFilmsStartList(results);
      })
      .catch((error) => setError(error));
  };

  return (
    <div className={s.container}>
      {error && (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {error.message}
        </h1>
      )}
      <PageTitle text={"Trending films today"} />
      {filmsStartList && <MoviesTrendList movies={filmsStartList} />}
    </div>
  );
}
