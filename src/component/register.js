import React from "react";
import { Alert } from "react-bootstrap";
import { validatePassword } from "../utility/util";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      base_url: "https://1234.ibtehaz.xyz",
      message: null,
      success: false,
    };
  }

  handleLogin(e) {
    e.preventDefault();
    let status = null;
    let email_address = e.target.email_address.value;
    let password = e.target.password.value;

    const passwrodValidityMessage = validatePassword(password);

    if (passwrodValidityMessage !== "Valid password!") {
      this.setState({
        success: false,
        message: passwrodValidityMessage,
      });
      return;
    }

    const register_url = this.state.base_url + "/user/register/";

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: email_address, password: password }),
    };

    fetch(register_url, requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then(
        (result) => {
          if (status === 202) {
            //accepted;
            this.setState({
              username: result["username"],
              success: true,
              message: result["message"],
            });
          } else {
            // show error message here!
            this.setState({
              success: false,
              message: result["message"],
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            success: false,
            message: error.message,
          });
        }
      );
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  render() {
    return (
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
          <button type="submit" className="btn btn-primary btn_submit">
            Register
          </button>
        </form>

        {/* message and status */}
        {this.state.message && (
          <div className="row">
            <Alert
              className={
                this.state.success
                  ? "alert alert-danger alert-space h6"
                  : "alert alert-success alert-space h6"
              }
              align="center"
            >
              {this.state.message}
              {this.state.success && (
                <small>Now you can login with your email!</small>
              )}
            </Alert>
          </div>
        )}
      </div>
    );
  }
}

export default Register;
