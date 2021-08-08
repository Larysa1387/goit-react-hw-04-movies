import React, { Component } from "react";
import Loader from "react-loader-spinner";
import s from "./Loader.module.css";

class LoaderEffect extends Component {
  state = {};
  render() {
    return (
      <Loader
        className={s.Loader}
        type="Puff"
        color="#E58B9D"
        height={150}
        width={150}
        timeout={3000}
      />
    );
  }
}

export default LoaderEffect;
