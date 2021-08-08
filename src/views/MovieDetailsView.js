import { useEffect, useState } from "react";
import {
  Route,
  NavLink,
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";

import * as moviesApi from "services/moviesAPI/moviesAPI";
import CastView from "./CastView";
import ReviewsView from "./ReviewsView";
import s from "./views.module.css";

export default function MovieDetailsView() {
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const { state } = useLocation();
  const history = useHistory();
  console.log(path);
  console.log(url);
  console.log(useLocation());
  useEffect(() => {
    moviesApi.fetchMovieDetailes(movieId).then((movie) => {
      setMovie(movie);
    });
  }, [movieId]);

  const handleGoBack = () => {
    history.push({
      pathname: state?.from?.pathname ?? "/movies",
    });
    if (state?.from?.pathname !== "/") {
      history.push({
        search: state?.from?.search ?? "",
      });
    }
  };

  return (
    <>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>
      {movie && (
        <>
          <h1>
            {movie.title} ({(movie.release_date ?? "unknown").split("-")[0]})
          </h1>
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
        </>
      )}

      <NavLink
        to={{
          pathname: `${url}/cast`,
          state: {
            from: {
              pathname: state?.from?.pathname ?? "/movies",
              search: state?.from?.search ?? "",
            },
          },
        }}
        className={s.navLink}
        activeClassName={s.activeLink}
      >
        Cast
      </NavLink>
      <NavLink
        to={{
          pathname: `${url}/reviews`,
          state: {
            from: {
              pathname: state?.from?.pathname ?? "/movies",
              search: state?.from?.search ?? "",
            },
          },
        }}
        className={s.navLink}
        activeClassName={s.activeLink}
      >
        Reviews
      </NavLink>

      <Route path={`${path}/cast`}>
        <CastView movieId={movieId} />
      </Route>
      <Route path={`${path}/reviews`}>
        <ReviewsView movieId={movieId} />
      </Route>
    </>
  );
}
