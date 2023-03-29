import React from 'react';
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
        };
    }
    
    
      handleLogin(e) {
        e.preventDefault();
        let email_address = e.target.email_address.value;
        let password = e.target.password.value;
    
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email_address, password: password })
        };
    
        fetch("http://localhost:8000/user/login/", requestOptions)
        .then(res => res.json())
        .then(
            (result) => {
                let status = result['status'];
                let message = result["message"];
                if (status == 202) {
                    //accepted
                    let username = result["username"];
                    this.setState({
                      username: username,
                    })
                } else {
                  // show error message here!
                }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
            }
        )
      }

      render() {
        return(
            <form align="left" onSubmit={this.handleLogin.bind(this)}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" name="email_address" 
                        className="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email"/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <br></br>
                <button type="submit" className="btn btn-success btn_submit">Login</button>
              </form>
        )
      }
}

export default Login;