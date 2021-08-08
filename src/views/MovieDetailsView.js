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
  const [error, setError] = useState("");
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const { state } = useLocation();
  const history = useHistory();

  useEffect(() => {
    moviesApi
      .fetchMovieDetailes(movieId)
      .then((movie) => {
        setMovie(movie);
      })
      .catch((error) => setError(error));
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
      <button className={s.btnGoback} type="button" onClick={handleGoBack}>
        Go back
      </button>
      {error && (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {error.message}
        </h1>
      )}
      {movie && (
        <div className={s.container}>
          <h1 className={s.filmTitle}>
            {movie.title} ({(movie.release_date ?? "unknown").split("-")[0]})
          </h1>
          <div className={s.aline}>
            <img
              className={s.moviePoster}
              src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.movieInfo}>
              <p>User score: {Math.round(movie.vote_average * 100) / 10}%</p>
              <h3 className={s.infoTitle}>Overview</h3>
              <p>{movie.overview}</p>
              <h3 className={s.infoTitle}>Genres</h3>
              {movie.genres.length > 0 ? (
                <ul className={s.genresList}>
                  {movie.genres.map(({ id, name }) => (
                    <li className={s.genresItem} key={id}>
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No info</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={s.container}>
        <div className={s.navAline}>
          <h3 className={s.infoTitle}>Additional Information</h3>
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
        </div>

        <Route path={`${path}/cast`}>
          <CastView movieId={movieId} />
        </Route>
        <Route path={`${path}/reviews`}>
          <ReviewsView movieId={movieId} />
        </Route>
      </div>
    </>
  );
}
