import React from 'react';
import { Link } from 'react-router-dom';
import './pagenotfound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h2>404 - Page Not Found</h2>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>Return to <Link to="/">Home</Link></p>
    </div>
  );
};

export default PageNotFound;

