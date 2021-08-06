import { Link } from "react-router-dom";

export default function MoviesView({ movies }) {
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
