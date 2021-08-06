import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// useLocation;
// import PropTypes from 'prop-types';
import * as moviesApi from "services/moviesAPI/moviesAPI";
import PageTitle from "components/PageTitle/PageTitle";
import MoviesTrendList from "components/MoviesTrendList/MoviesTrendList";

export default function HomePage(params) {
  const [filmsStartList, setFilmsStartList] = useState([]);
  // const { pathname } = useLocation();

  useEffect(() => {
    searchMoviesFetch();
  }, []);

  const searchMoviesFetch = () => {
    moviesApi.fetchTrendingMovies().then(({ results }) => {
      console.log(results);
      setFilmsStartList(results);
    });
  };

  return (
    <div>
      <PageTitle text={"Trending films today"} />
      {filmsStartList && <MoviesTrendList movies={filmsStartList} />}
      {/* {filmsStartList && (
        <ul>
          {filmsStartList.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}
