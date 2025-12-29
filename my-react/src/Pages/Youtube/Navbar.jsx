import { useState } from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSubmit = (val) => {
    val.preventDefault();
    if (searchKeyword.trim()) {
      onSearch(searchKeyword);
    }
  };
  return (
    <nav className="navbar">
      <div className="logo-sect">
        <span className="logo">Youtube Clone</span>
      </div>
      <form className="form-sect" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchKeyword}
          onChange={(keyword) => setSearchKeyword(keyword.target.value)}
          className="search-sect-input"
        />
        <button className="form-button">Search Now!</button>
      </form>
      <div className="Bagian Akhir"></div>
    </nav>
  );
};

export default Navbar;
