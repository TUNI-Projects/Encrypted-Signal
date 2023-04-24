import React from "react";
import Cookies from "js-cookie";
import { Alert } from "react-bootstrap";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      error_message: null,
      success_message: null,
      base_url: process.env.REACT_APP_API_SERVER,
    };
  }

  setCookie() {
    Cookies.set("username", this.state.username, {
      path: "/",
      sameSite: "strict",
      maxAge: "10000",
    });
  }

  handleLogin(e) {
    e.preventDefault();
    let email_address = e.target.email_address.value;
    let password = e.target.password.value;
    const login_url = this.state.base_url + "/user/login/";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email_address, password: password }),
    };

    let status = null;
    fetch(login_url, requestOptions)
      .then((res) => {
        status = res.status;
        // let values = res.headers.values();
        console.log(res.headers.get('set-cookie'));
        console.log(res.cookie);
        console.log(res.headers);
        console.log(res.headers.get('set-cookie'));

        return res.json();
      })
      .then(
        (result) => {
          console.log(result);
          if (status === 202) {
            //accepted
            let username = result["username"];
            this.setState({
              username: username,
              success_message: result["message"],
            });
            this.setCookie();
            window.location.replace(process.env.REACT_APP_HOMEPAGE);
          } else {
            // show error message here!
            this.setState({
              username: null,
              error_message: result["message"],
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            username: null,
            error_message: error,
          });
        }
      );
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <form align="left" onSubmit={this.handleLogin.bind(this)}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                name="email_address"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
            <br></br>
            <button type="submit" className="btn btn-success btn_submit">
              Login
            </button>
          </form>
        </div>

        {/* error message */}
        <div className="row">
          {this.state.error_message != null && (
            <Alert className="alert-danger"> {this.state.error_message} </Alert>
          )}
        </div>
        {/* success message */}
        <div className="row">
          {this.state.success_message != null && (
            <Alert className="alert-success">
              {" "}
              {this.state.success_message}{" "}
            </Alert>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
