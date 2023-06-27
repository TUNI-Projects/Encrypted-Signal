import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowSize: window.innerWidth,
      tag: "",
      last_update: "",
    };
  }

  componentDidMount() {
    this.fetchGitTag();
  }

  fetchGitTag = () => {
    const localData = require("../version.json");
    this.setState({
      tag: localData.tag,
      last_update: new Date(localData.date).toLocaleString("en-GB"),
    });
  };

  render() {
    const isMobileView = this.state.windowSize <= 1100;
    if (isMobileView) {
      return (
        <div
        className="footer"
        style={{
          background: "#282c34",
          padding:"10px",
        }}
      >
        <small
          className="d-flex justify-content-center"
          style={{ color: "#fff", fontSize: "9px" }}
        >
          Version: {this.state.tag}, Deployed at {this.state.last_update}
        </small>

        <p
          className="d-flex justify-content-center"
          style={{ color: "#FFB60A", paddingTop: "3px", }}
        >
          with ❤️ from &nbsp; <a
              href="https://ibtehaz.xyz"
              style={{color: "#FFB60A"}}
            >
                Ibtehaz
            </a>
        </p>
      </div>
      );
    }

    // ----------------------------------------------------
    // this is web view. 
    // ----------------------------------------------------

    return (
      <div
        className="footer d-flex justify-content-center"
        style={{ background: "#282c34", padding: "5px"}}
      >
        <div className="col-md-3">
          <small style={{ color: "#fff", fontSize: "9px" }}>
            Version: {this.state.tag} - {process.env.NODE_ENV}, Deployed at {this.state.last_update}
          </small>
        </div>
        <div
          className="col-md-4 d-flex justify-content-center"
        >
          <p style={{ color: "#FFB60A"}}>
            with ❤️ from &nbsp;
            <a
              href="https://ibtehaz.xyz"
              style={{ color: "#FFB60A" }}
            >
              Ibtehaz
            </a>
          </p>
        </div>

        <div className="col-md-3"></div>
      </div>
    );
  }
}

export default Footer;