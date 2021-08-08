import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import moviesApi from "services/moviesAPI/moviesAPI";
import AppBar from "components/AppBar/AppBar";
import Loader from "components/Loader/Loader";
// import HomePage from "views/HomePage";
// import MovieDetailsView from "views/MovieDetailsView";
// import MoviesView from "views/MoviesView";

const HomePage = lazy(() =>
  import("views/HomePage" /* webpackChunkName: "home-page" */)
);
const MovieDetailsView = lazy(() =>
  import("views/MovieDetailsView" /* webpackChunkName: "movie-details-view" */)
);
const MoviesView = lazy(() =>
  import("views/MoviesView" /* webpackChunkName: "movies-view" */)
);

function App() {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <section className="App">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies/:movieId" component={MovieDetailsView} />
            <Route path="/movies" component={MoviesView} />
            {/* <Route path="/" className={s.navLink} component={404} /> */}
          </Switch>
        </section>
      </Suspense>
    </>
  );
}

export default App;
