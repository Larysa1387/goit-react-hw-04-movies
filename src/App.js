import "./App.css";
import { Route, Switch } from "react-router-dom";
// import { useEffect, useState } from "react";
// import moviesApi from "services/moviesAPI/moviesAPI";
import AppBar from "components/AppBar/AppBar";
import HomePage from "views/HomePage";
import MovieDetailsView from "views/MovieDetailsView";
import MoviesView from "views/MoviesView";

function App() {
  return (
    <>
      <AppBar />
      <section className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/movies/:movieId" component={MovieDetailsView} />
          <Route path="/movies" component={MoviesView} />
          {/* <Route path="/" className={s.navLink} component={404} /> */}
        </Switch>
      </section>
    </>
  );
}

export default App;
