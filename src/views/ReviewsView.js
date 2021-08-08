import * as moviesApi from "services/moviesAPI/moviesAPI";
import { useState, useEffect } from "react";
import s from "./views.module.css";

export default function ReviewsView({ movieId }) {
  const [reviewsArr, setreviewsArr] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    moviesApi
      .fetchMovieReviews(movieId)
      .then(({ results }) => {
        setreviewsArr(results);
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
      {reviewsArr.length !== 0 ? (
        <ul className={s.reviewsList}>
          {reviewsArr.map(({ id, author, content }) => (
            <li key={id}>
              <p className={s.reviewAuthor}>Author: {author}</p>
              <q className={s.content}>{content}</q>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No rewievs here</h3>
      )}
    </>
  );
}
