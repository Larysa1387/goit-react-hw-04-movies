import * as moviesApi from "services/moviesAPI/moviesAPI";
import { useState, useEffect } from "react";

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
        <ul>
          {castArr.map(({ name, id, profile_path, character }) => (
            <li key={id}>
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
