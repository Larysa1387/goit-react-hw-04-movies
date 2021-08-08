import { Link, useLocation } from "react-router-dom";
import s from "./MoviesTrendList.module.css";

export default function MoviesTrendList({ movies }) {
  const location = useLocation();
  return (
    <ul className={s.trendMoviesList}>
      {movies.map(({ id, title }) => (
        <li key={id} className={s.trendListItem}>
          {/* <Link to={`/movies/${id}`}>{title}</Link> */}
          <Link
            className={s.trendLink}
            to={{
              pathname: `/movies/${id}`,
              state: { from: location },
            }}
          >
            <p>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
