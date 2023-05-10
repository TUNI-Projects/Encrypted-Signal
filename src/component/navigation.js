import "./../css/App.css";
import React from "react";
import Cookies from "js-cookie";

class NavBar extends React.Component {


  logout(event) {
    event.preventDefault();
    const logout_url = "http://127.0.0.1:8000/user/logout/";
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(logout_url, requestOptions)
      .then((response) => {
        return Promise.all([response.json(), response.status]);
      })
      .then(([res, status]) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    Cookies.remove('username', {path: '/'});
    Cookies.remove('sessionId', {path: '/'});
    window.location.reload();
  }

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
              <a className="nav-link" onClick={this.logout.bind(this)}>
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
