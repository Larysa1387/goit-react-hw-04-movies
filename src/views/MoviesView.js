import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as moviesAPI from "../services/moviesAPI/moviesAPI";
// import qs from "query-string";

export default function MoviesView() {
  const { pathname, search } = useLocation();
  const location = useLocation();
  const history = useHistory();

  // const [searchQuery, setSearchQuery] = useState(qs.parse(search)?.query ?? "");
  const [searchQuery, setSearchQuery] = useState("");
  const [moviesArr, setMoviesArr] = useState([]);

  const querySearch = new URLSearchParams(search).get("query"); /*?? ""*/

  useEffect(() => {
    if (search === "") {
      return;
    }
    // if (searchQuery) {
    //   moviesAPI
    //     .fetchMoviesOnQuery(querySearch)
    //     .then(({ results }) => setMoviesArr(results));
    // }
    moviesAPI
      .fetchMoviesOnQuery(querySearch)
      .then(({ results }) => setMoviesArr(results));
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

    history.push({
      ...location,
      search: `query=${searchQuery}`,
    });
    setSearchQuery("");
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Enter film name..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>
      {moviesArr && (
        <ul>
          {moviesArr.map(({ id, title, poster_path }) => (
            <li key={id}>
              {/* <Link to={`/movies/${id}`}>{title}</Link> */}
              <Link
                to={{
                  pathname: `${pathname}/${id}`,
                  state: {
                    from: location,
                  },
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                  alt={title}
                />
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
