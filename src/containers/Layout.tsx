import React from "react";
import { Link, NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="container">
      <div className="header">
        <Link to="/">
          <h1 className="title">Sooji Son</h1>
        </Link>
        <nav>
          <NavLink to="/" exact activeClassName="selected">
            <h2>/home</h2>
          </NavLink>

          <NavLink to="/about" activeClassName="selected">
            <h2>/about</h2>
          </NavLink>
        </nav>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
