import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// useRouteMatch;
import * as moviesApi from "services/moviesAPI/moviesAPI";

export default function MovieDetailsView() {
  const [movie, setMovie] = useState("");
  // const { url } = useRouteMatch();
  const { movieId } = useParams();

  useEffect(() => {
    moviesApi.fetchMovieDetailes(movieId).then((movie) => {
      setMovie(movie);
    });
  }, [movieId]);
  console.log(movie);
  return (
    <>
      {movie && (
        <>
          <h2>{movie.title}</h2>
          <p>{movie.release_date}</p>
          <p>User score: {Math.round(movie.popularity / 100)}%</p>
          {/* <img src={movie.poster_path} alt={movie.title} /> */}
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
          <p>id: {movieId}</p>
        </>
      )}
    </>
  );
}
