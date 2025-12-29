import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Bootcamp Batch : 17 Experiment with js</h1>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/">#home</Link>
        </li>

        <li className="nav-item">
          <Link to="/comment">#comment</Link>
        </li>

        <li className="nav-item">
          <Link to="/Form">#form</Link>
        </li>
        <li className="nav-item">
          <Link to="/playground">#others</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
