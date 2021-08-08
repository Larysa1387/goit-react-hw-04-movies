import * as moviesApi from "services/moviesAPI/moviesAPI";
import { useState, useEffect } from "react";

export default function ReviewsView({ movieId }) {
  const [reviewsArr, setreviewsArr] = useState([]);

  useEffect(() => {
    moviesApi.fetchMovieReviews(movieId).then(({ results }) => {
      console.log(results);
      setreviewsArr(results);
    });
  }, [movieId]);
  return (
    <>
      {reviewsArr.length !== 0 ? (
        <ul>
          {reviewsArr.map(({ id, author, content }) => (
            <li key={id}>
              <p>Author: {author}</p>
              <q>{content}</q>
            </li>
          ))}
        </ul>
      ) : (
        <h3>No rewievs here</h3>
      )}
    </>
  );
}
