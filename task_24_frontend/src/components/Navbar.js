
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-center">
        <button className="btn btn-primary mx-3" onClick={() => handleNav('/personal-info')}>Personal Info</button>
        <button className="btn btn-primary mx-3" onClick={() => handleNav('/profile-info')}>Profile Info</button>
        <button className="btn btn-primary mx-3" onClick={() => handleNav('/academic-info')}>Academic Info</button>
        <button className="btn btn-primary mx-3" onClick={() => handleNav('/work-experience')}>Work Experience</button>
      </div>
    </nav>
  );
};

export default Navbar;
