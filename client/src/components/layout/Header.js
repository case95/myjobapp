import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.css'

const Header = ({
  children }) => {
    
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark m-0 py-3">
      <div className="container">
        <Link to="/" className="navbar-brand">{children}</Link>
      </div>
      <ul className='navbar-nav mr-auto'>
        <li className="nav-item">
          <Link to="/workers" className='nav-link'>Browse</Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className='nav-link'>Sign In</Link>
        </li>
        <li className="nav-item">
          <Link to="/page3" className='nav-link'>Page3</Link>
        </li>
      </ul>
    </nav>
  )
}

Header.defaultProps = {
  children: 'My App'
}

Header.propTypes = {
  children: PropTypes.string
}


export default Header