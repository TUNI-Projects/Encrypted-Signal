import "./../css/App.css";
import React from "react";
import Cookies from "js-cookie";
import NavBar from "./navigation";
import ListOfFiles from "./files";

class Dashboard extends React.Component {
  render() {
    let username = Cookies.get("username");
    console.log(username);

    return (
      <div className="container">
        <NavBar />

        <div className="container">
          <div className="row dash_main">
            <div className="col-md-4">
              <ListOfFiles />
            </div>

            <div className="col-md-8"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
