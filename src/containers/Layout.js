import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <h1>Sooji Son</h1>
      <nav>
        <Link to="/">
          <h2>/home</h2>
        </Link>

        <Link to="/about">
          <h2>/about</h2>
        </Link>
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
