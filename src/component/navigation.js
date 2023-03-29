import "./../css/App.css";
import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navigation">
        <a className="navbar-brand" href="#">
          Encrypted Signal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Notification
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
