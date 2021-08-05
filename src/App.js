import "./App.css";
// import { useEffect, useState } from "react";
// import moviesApi from "services/moviesAPI/moviesAPI";
import HomePage from "views/HomePage";

function App() {
  // const [filmsStartList, setFilmsStartList] = useState([]);
  // useEffect(() => {
  //   searchMoviesFetch();
  // }, []);
  // const searchMoviesFetch = () => {
  //   moviesApi.fetchMovies().then(({ results }) => {
  //     console.log(results);
  //     setFilmsStartList(results);
  //   });
  // };

  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
