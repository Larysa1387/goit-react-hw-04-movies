import { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import * as moviesAPI from "../services/moviesAPI/moviesAPI";
import qs from "query-string";

export default function MoviesView() {
  const { pathname, search } = useLocation();
  const location = useLocation();
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState(qs.parse(search)?.query ?? "");
  const [moviesArr, setMoviesArr] = useState([]);
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    if (searchQuery) {
      searchMoviesFetch();
      // setSearchQuery("");
    }
    // if (searchQuery) {
    //   function searchMoviesFetch() {
    //     moviesAPI
    //       .fetchMoviesOnQuery(searchQuery)
    //       .then(({ results }) => setMoviesArr(results));
    //   }
    //   searchMoviesFetch();
    // }
    // history.push({ search: `query=${searchQuery}` });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchMoviesFetch = () => {
    // setLoading(true);
    moviesAPI
      .fetchMoviesOnQuery(searchQuery)
      .then(({ results }) => setMoviesArr(results));
  };

  const handleInputChange = (e) => {
    // history.push({
    //   ...location,
    //   /*pathname,*/ search: `query=${e.target.value}`,
    // });
    setSearchQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchMoviesFetch();
    history.push({
      ...location,
      /*pathname,*/ search: `query=${searchQuery}`,
    });
    // setSearchQuery("");
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
          {moviesArr.map(({ id, title }) => (
            <li key={id}>
              {/* <Link to={`/movies/${id}`}>{title}</Link> */}
              <Link
                to={{
                  pathname: `${pathname}/${id}`,
                  state: {
                    from: pathname,
                    searchQuery,
                  },
                }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
