import { Link } from "gatsby";
import React from "react";
import "./Layout.css";

export const Layout = ({ children }) => {
  return (
    <div className="page-container">
      <nav className="nav">
        <Link className="link" activeClassName="active" to="/">
          Home
        </Link>
        <Link className="link" activeClassName="active" to="/about/">
          About
        </Link>
        <Link className="link" activeClassName="active" to="/contact/">
          Contact
        </Link>
      </nav>
      <main className="main">{children}</main>
      <footer className="footer">A Simple Gatsby Site</footer>
    </div>
  );
};
