import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Hook to use redux in functional components
import { useSelector, useDispatch } from "react-redux";

//Redux to dynamically change the nav options if logged in or logged out.
import { SIGN_IN_OUT } from "../../store/actions";

import "./Header.css";

const Header = ({ children, logo}) => {
  const isSignedIn = useSelector((state) => state.isSignedIn);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: SIGN_IN_OUT });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark m-0 py-3">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {logo} {' '}
          {children}
        </Link>
      </div>
      <ul className="navbar-nav mr-auto">
        
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        
        <li className="nav-item">
          <Link to="/browse" className="nav-link">
            Browse
          </Link>
        </li>

        {!isSignedIn && (
          <li className="nav-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
        )}

        {!isSignedIn && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          </li>
        )}

        {isSignedIn && (
          <li className="nav-item">
            <Link to="/yourprofile" className="nav-link">
              Your Profile
            </Link>
          </li>
        )}

        {isSignedIn && (
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => logout()}>
              Log Out
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Header.defaultProps = {
  children: "My App",
};

Header.propTypes = {
  children: PropTypes.string,
};
/*
//Links the state data we are looking for to the "header" props.
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.isSignedIn,
  };
};

//Connect is a function that takes a function as an argument and returns a function taking the component as argument.*/
export default Header; //counter(mapStateToProps)(Header);
