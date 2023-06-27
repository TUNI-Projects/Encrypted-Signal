import Cookies from "js-cookie";
import React from "react";
import Dashboard from "./component/dashboard";
import Footer from "./component/footer";
import Login from "./component/login";
import Register from "./component/register";
import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      isSignUpActive: false,
    };
  }

  handleLoginClick(event) {
    this.setState({
      isLoginActive: true,
      isSignUpActive: false,
    });
  }

  handleSignUpClick(event) {
    this.setState({
      isSignUpActive: true,
      isLoginActive: false,
    });
  }

  render() {
    let username = Cookies.get("username");

    return (
      <div className="parent-container">
        <div className="main-content">
          {/* if login required. */}
          {username == null && (
            <div className="container-fluid">
              <br></br>
              <br></br>
              <div className="row">
                <div className="col-md-4">{/* empty container */}</div>

                <div className="col-md-4">
                  <div className="row auth" align="center">
                    <div
                      className="col-md-6"
                      onClick={this.handleLoginClick.bind(this)}
                    >
                      <p
                        className={
                          this.state.isLoginActive ? "focus entry" : "entry"
                        }
                      >
                        Login
                      </p>
                      <hr></hr>
                    </div>

                    <div
                      className="col-md-6"
                      onClick={this.handleSignUpClick.bind(this)}
                    >
                      <p
                        className={
                          this.state.isSignUpActive ? "focus entry" : "entry"
                        }
                      >
                        Sign up
                      </p>
                      <hr></hr>
                    </div>

                    {this.state.isLoginActive && <Login />}
                    {this.state.isSignUpActive && <Register />}
                  </div>
                </div>
                <div className="col-md-4"></div>
              </div>

              {/* General Disclaimer and Other Section */}
              <div
                className="row container-fluid"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <div className="col-md-2"> </div>
                <div className="col-md-8">
                  <div className="auth" align="center">
                    <div className="row">
                      <p
                        className="h3"
                        align="center"
                        style={{ color: "#FFB60A" }}
                      >
                        {" "}
                        General Disclaimer!
                      </p>
                      <p className="" align="left">
                        <ul>
                          <li>
                            <b>Account Creation:</b> Please note that anyone can
                            create an account on this website. However, it is
                            important to be aware that there is no email
                            verification process in place during the account
                            creation. Additionally, there is no forgotten
                            password feature available. Please consider this
                            before creating an account, as these functionalities
                            will not be added in the future.
                          </li>
                          <li>
                            This website was created as a final project and
                            should not be used to upload any sensitive or
                            confidential information. If you wish to test the
                            functionality and performance, you can generate a
                            random document from{" "}
                            <a
                              href="https://www.lipsum.com/."
                              style={{ color: "#FFB60A" }}
                            >
                              Lipsum [dot] com
                            </a>
                          </li>
                          <li>
                            User accounts and encrypted files will be
                            periodically cleared for security purposes.
                          </li>
                          <li>
                            While I have made efforts to adhere to Secure
                            Programming principles and paradigms, it is
                            important to note that I am a human being and a
                            student. There may be potential loopholes or
                            vulnerabilities that I may have overlooked.
                            Therefore, there is a risk of files being leaked.
                          </li>
                          <li>
                            This website utilizes cookies to maintain user
                            sessions. The user session duration is set to 15
                            minutes.
                          </li>
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-2"> </div>
              </div>
            </div>
          )}

          {username != null && <Dashboard />}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
