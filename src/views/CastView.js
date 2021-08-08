import * as moviesApi from "services/moviesAPI/moviesAPI";
import { useState, useEffect } from "react";
import s from "./views.module.css";

export default function CastView({ movieId }) {
  const [castArr, setCastArr] = useState([]);

  useEffect(() => {
    moviesApi.fetchMovieCast(movieId).then(({ cast }) => {
      console.log(cast);
      setCastArr(cast);
    });
  }, [movieId]);

  return (
    <>
      {castArr !== 0 ? (
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
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast info here</p>
      )}
    </>
  );
}
