import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as moviesAPI from "../services/moviesAPI/moviesAPI";
// import qs from "query-string";
import s from "./views.module.css";

export default function MoviesView() {
  const { pathname, search } = useLocation();
  const location = useLocation();
  const history = useHistory();

  // const [searchQuery, setSearchQuery] = useState(qs.parse(search)?.query ?? "");
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesArr, setMoviesArr] = useState([]);
  const [error, setError] = useState("");

  const querySearch = new URLSearchParams(search).get("query"); /*?? ""*/

  useEffect(() => {
    if (search === "") {
      return;
    }
    if (!querySearch) {
      return;
    }
    moviesAPI
      .fetchMoviesOnQuery(querySearch)
      .then(({ results }) => setMoviesArr(results))
      .catch((error) => setError(error));
    // history.push({ search: `query=${querySearch}` });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // const searchMoviesFetch = () => {
  //   // setLoading(true);
  //   moviesAPI
  //     .fetchMoviesOnQuery(querySearch)
  //     .then(({ results }) => setMoviesArr(results));
  // };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      // toast.warn("Tipe your query!");
      return;
    }

    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    setSearchQuery("");
  };

  return (
    <div className={s.container}>
      <form className={s.searchForm} onSubmit={handleFormSubmit}>
        <input
          className={s.inputMovie}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter film name..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className={s.inputBtn} type="submit">
          {/* <span>Search</span> */}
        </button>
      </form>
      {error && (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {error.message}
        </h1>
      )}
      {moviesArr && (
        <ul className={s.searchMoviesList}>
          {moviesArr.map(({ id, title, poster_path }) => (
            <li className={s.searchMoviesItem} key={id}>
              {/* <Link to={`/movies/${id}`}>{title}</Link> */}
              <Link
                className={s.searchMovieLink}
                to={{
                  pathname: `${pathname}/${id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                {poster_path ? (
                  <img
                    className={s.searchMoviesImg}
                    src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                    alt={title}
                  />
                ) : (
                  <p>No poster</p>
                )}
                <p className={s.searchMovieTitle}>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
