import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Bootcamp Batch : 17 Experiment with js</h1>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">Home</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
