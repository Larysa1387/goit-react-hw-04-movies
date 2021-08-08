import * as moviesApi from "services/moviesAPI/moviesAPI";
import { useState, useEffect } from "react";
import s from "./views.module.css";

export default function CastView({ movieId }) {
  const [castArr, setCastArr] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    moviesApi
      .fetchMovieCast(movieId)
      .then(({ cast }) => {
        setCastArr(cast);
        setError("");
      })
      .catch((error) => setError(error));
  }, [movieId]);

  return (
    <>
      {error && (
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {error.message}
        </h1>
      )}
      {castArr.length > 0 ? (
        <ul className={s.castList}>
          {castArr.map(({ name, id, profile_path, character }) => (
            <li className={s.castItem} key={id}>
              {profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                  alt=""
                />
              ) : (
                <p>No image</p>
              )}
              <p className={s.castInfo}>{name}</p>
              {character && (
                <p className={s.castInfo}>Character: {character}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h3>No cast info here</h3>
      )}
    </>
  );
}
