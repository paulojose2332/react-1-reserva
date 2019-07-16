import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

const Navbar = ({ handleChange, clearSearch, searchString }) => (
  <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-dark">
    <Link onClick={clearSearch} to="/">
      <div className="navbar-brand col-1">
        <img src={logo} className="Navbar-logo" alt="logo" />
      </div>
    </Link>

    <div className="form-group justify-content-center row col-10 my-2">
      <input
        value={searchString}
        onChange={e => {
          handleChange(e);
        }}
        className="form-control col-9 mr-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  </nav>
);

Navbar.propTypes = {
  searchString: PropTypes.string
};

export default Navbar;
