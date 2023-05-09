import React from "react";
import { Alert } from "react-bootstrap";

class Download extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: this.props.filename,
      file_id: this.props.file_id,
      failure_msg: null,
      password: "",
      // base_url: "https://1234.ibtehaz.xyz",
      base_url: "http://127.0.0.1:8000",
    };
  }

  handleOnChange(event) {
    this.setState({
      password: event.target.value,
    });
  }

  handleDownload(event) {
    // download files from the server.
    event.preventDefault();
    const download_url =
      this.state.base_url + "/share/download/v3/" + this.state.file_id + "/";

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        password: this.state.password,
      }),
    };
    fetch(download_url, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          return Promise.all([response.json(), response.status]);
        } else {
          return Promise.all([response.blob(), response.status]);
        }
      })
      .then(([blob, status]) => {
        if (status !== 200) {
          this.setState({
            success: false,
            failure_msg: blob.message,
          });
        } else {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = this.state.filename;
          a.click();
        }
      })
      .catch((error) => {
        this.setState({
          success: false,
          failure_msg: error.message,
        });
      });
  }

  render() {
    return (
      <div className="row">
        <form
          className="form-row align-items-center"
          onSubmit={this.handleDownload.bind(this)}
        >
          <div className="col-auto">
            <input
              type="password"
              name="password"
              className="form-control mb-2"
              aria-describedby="passwordHelp"
              placeholder="Enter Decryption Password"
              value={this.state.password}
              onChange={this.handleOnChange.bind(this)}
              required
            />
          </div>
          <div className="col-auto">
            <button
              className="btn btn-primary btn_upload"
              style={{ width: "100%" }}
              type="submit"
            >
              Decrypt & Download
            </button>
          </div>
        </form>

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

export default Download;
