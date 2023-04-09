import React from "react";
import { Alert } from "react-bootstrap";

class ShareOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success_msg: null,
      failure_msg: null,
      shared_email: "",
      base_url: process.env.REACT_APP_API_SERVER,
    };
  }

  handleOnChange(event) {
    this.setState({
        shared_email: event.target.value
    })
  }

  handleShareSubmit(event) {
    event.preventDefault();
    let status = null;
    const username = "cde7f0fb";
    const share_url = this.state.base_url + "/share/" + username + "/";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        share_email: this.state.shared_email,
        file_id: this.props.file_id,
      }),
    };

    fetch(share_url, requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then(
        (result) => {
          if (status === 202) {
            // success
            this.setState({
              success_msg: result["message"],
              shared_email: "",
            });
          } else {
            // failure
            this.setState({
              failure_msg: result["message"],
              shared_email: "",
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            failure_msg: error,
            shared_email: "",
          });
        }
      );
      
  }

  render() {
    return (
      <div className="row">
        <form
          className="form-row align-items-center"
          onSubmit={this.handleShareSubmit.bind(this)}
        >
          <div className="col-auto">
            <input
              type="email"
              name="share_email_address"
              className="form-control mb-2"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              value={this.state.shared_email}
              onChange={this.handleOnChange.bind(this)}
            />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary btn_upload"
              style={{ maxWidth: "100vw" }}
              type="submit"
            >
              Share
            </button>
          </div>
        </form>

        {/* success message here */}
        {this.state.success_msg && (
          <Alert className="alert alert-success alert-space h6" align="center">
            {this.state.success_msg}
          </Alert>
        )}

        {/* error message here */}
        {this.state.failure_msg && (
          <Alert className="alert alert-danger alert-space h6" align="center">
            {this.state.failure_msg}
          </Alert>
        )}
      </div>
    );
  }
}

export default ShareOption;
