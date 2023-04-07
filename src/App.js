import "./css/App.css";
import React from "react";
import Login from "./component/login";
import Register from "./component/register";
import Cookies from "js-cookie";
import Dashboard from "./component/dashboard";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true,
      isSignUpActive: false
    };
  }

  handleLoginClick(event) {
     this.setState({
      isLoginActive: true,
      isSignUpActive: false,
     })
  }

  handleSignUpClick(event) {
    this.setState({
      isSignUpActive: true,
      isLoginActive: false,
    })
  }

  render() {
    let username = Cookies.get("username");

    return (
      <div className="">
        {username == null && (
          <div className="container-fluid landing App">
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row">
              <div className="col-md-4"></div>

              <div className="col-md-4">
                <div className="row auth" align="center">

                  <div className="col-md-6" onClick={this.handleLoginClick.bind(this)}>
                    <p className={this.state.isLoginActive ? 'focus entry': 'entry'}>Login</p>
                    <hr></hr>
                  </div>

                  <div className="col-md-6" onClick={this.handleSignUpClick.bind(this)}>
                    <p className={this.state.isSignUpActive ? 'focus entry': 'entry'}>Sign up</p>
                    <hr></hr>
                  </div>

                  {this.state.isLoginActive && (<Login/>)}
                  {this.state.isSignUpActive && (<Register/>)}
                  {/* <Register /> */}
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>

            <br></br>
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <footer className="footer" align="center">
                  
                </footer>
              </div>
              <div className="col-md-3"></div>
            </div>
          </div>
          
        )}

        {username != null && <Dashboard />}
      </div>
    );
  }
}

export default App;
