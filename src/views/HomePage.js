import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import moviesApi from "services/moviesAPI/moviesAPI";
import PageTitle from "components/PageTitle/PageTitle";

export default function HomePage(params) {
  const [filmsStartList, setFilmsStartList] = useState([]);
  useEffect(() => {
    searchMoviesFetch();
  }, []);

  const searchMoviesFetch = () => {
    moviesApi.fetchMovies().then(({ results }) => {
      console.log(results);
      setFilmsStartList(results);
    });
  };

  return (
    <div>
      <PageTitle text={"Trending films today"} />
      <ul>
        {filmsStartList.map(({ id, title }) => (
          <li key={id}>
            <p>{title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
