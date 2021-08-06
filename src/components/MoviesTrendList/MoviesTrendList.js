import { Link, useLocation } from "react-router-dom";

export default function MoviesTrendList({ movies }) {
  const { pathname } = useLocation();
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          {/* <Link to={`/movies/${id}`}>{title}</Link> */}
          <Link
            to={{
              pathname: `/movies/${id}`,
              state: { from: pathname },
            }}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
