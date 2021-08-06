import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => (
  <nav>
    <NavLink exact to="/" className={s.navLink} activeClassName={s.activeLink}>
      Home
    </NavLink>
    <br />
    <NavLink to="/movies" className={s.navLink} activeClassName={s.activeLink}>
      Movies
    </NavLink>
  </nav>
);

export default Navigation;
