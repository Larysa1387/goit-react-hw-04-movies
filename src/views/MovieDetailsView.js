import { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
// useRouteMatch, useHistory;
import * as moviesApi from "services/moviesAPI/moviesAPI";

export default function MovieDetailsView() {
  const [movie, setMovie] = useState(null);
  // const { url } = useRouteMatch();
  const { movieId } = useParams();
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    moviesApi.fetchMovieDetailes(movieId).then((movie) => {
      setMovie(movie);
    });
  }, [movieId]);

  const handleGoBack = () => {
    history.push({
      pathname: state?.from ?? "/movies",
      search: `query=${state.searchQuery}` /*?? `query=${state}`*/,
    });
  };

  return (
    <>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>
      {movie && (
        <>
          <h2>
            {movie.title} ({(movie.release_date ?? "unknown").split("-")[0]})
          </h2>
          {/* <p>{movie.release_date}</p> */}
          <p>User score: {Math.round(movie.vote_average * 100) / 10}%</p>
          <img
            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
            alt={movie.title}
          />
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
