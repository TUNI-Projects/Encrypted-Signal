import "./../css/App.css";
import React from "react";
import axios from "axios";
import { Alert, ProgressBar } from "react-bootstrap";
import { validatePassword } from "../utility/util";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxSize: 10 * 1024 * 1024,
      file: null,
      isFileSelected: false,
      progress: 0,
      success_message: null,
      error_message: null,
      // base_url: "https://1234.ibtehaz.xyz",
      base_url: "http://127.0.0.1:8000",
    };
  }

  changeHandler(event) {
    // change the state if a file is added on the input field.
    this.setState({
      file: event.target.files[0],
      isFileSelected: true,
      progress: 0,
      success_message: null,
      error_message: null,
    });
  }

  handleUploadClick(e) {
    // handle the upload option.
    e.preventDefault();
    if (this.state.file["size"] > this.state.maxSize) {
      this.setState({
        error_message: "File size is too large. Maximum upload limit is 10 MB",
      });
      return;
    }
    const upload_url = this.state.base_url + "/share/upload/";

    if (this.state.file == null) {
      this.setState({
        error_message: "You have to select a file to encrypt and upload!",
      });
      return;
    }
    let shared_email = e.target.share_email_address.value;

    // file ENCRYPT
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // const fileContents = fileReader.result;
      const password = e.target.encryption_password.value;

      const passwrodValidityMessage = validatePassword(password);

      if (passwrodValidityMessage !== "Valid password!") {
        this.setState({
          error_message: passwrodValidityMessage,
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("filename", this.state.file["name"]);
      formData.append("file_type", this.state.file["type"]);
      formData.append("password", password);

      if (shared_email !== "") {
        formData.append("shared_email", shared_email);
      }

      axios
        .post(upload_url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          onUploadProgress: (data) => {
            //Set the progress value to show the progress bar
            this.setState({
              progress: Math.round((100 * data.loaded) / data.total),
            });
          },
          withCredentials: true, // Include credentials with the request
        })
        .then(
          (result) => {
            if (result.status === 201) {
              this.setState({
                file: null,
                isFileSelected: false,
                progress: 100,
                success_message: result["data"]["message"],
              });
            } else {
              this.setState({
                progress: 0,
                error_message: result["message"],
              });
            }
          },
          (error) => {
            this.setState({
              progress: 0,
              error_message: error.message,
            });
          }
        );
    };
    fileReader.readAsText(this.state.file);
    // e.target.files = null;
  }

  render() {
    return (
      <div className="file_upload">
        <div className="row">
          <h4> Encrypt & Upload a File</h4>
        </div>
        <hr />

        <div className="row">
          <div className="form-control dropzone file_upload_bg" id="dropzone">
            <div className="center_middle">
              <form onSubmit={this.handleUploadClick.bind(this)}>
                <input
                  name="file"
                  type="file"
                  onChange={this.changeHandler.bind(this)}
                />

                {this.state.file && (
                  <div>
                    <div className="form-group upload_share_email">
                      <input
                        type="password"
                        name="encryption_password"
                        className="form-control"
                        id="inputPassword1"
                        aria-describedby="PasswordHelp"
                        placeholder="Enter Encryption Password"
                        required
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Required: Type in encryption password!
                      </small>
                    </div>
                    <div className="form-group upload_share_email">
                      <input
                        type="email"
                        name="share_email_address"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email"
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Optional: Share this file with someone!
                      </small>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-primary btn_upload"
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: "5px",
                  }}
                  type="submit"
                >
                  Encrypt & Upload
                </button>
              </form>

              <div className="upload_status">
                {/* upload progress bar */}
                {this.state.file && (
                  <ProgressBar
                    className="progress_bar"
                    now={this.state.progress}
                    label={`${this.state.progress}%`}
                  />
                )}

                {/* success message here */}
                {this.state.success_message && (
                  <Alert
                    className="alert alert-success alert-space h6"
                    align="center"
                  >
                    {this.state.success_message}
                  </Alert>
                )}

                {/* error message here */}
                {this.state.error_message && (
                  <Alert
                    className="alert alert-danger alert-space h6"
                    align="center"
                  >
                    {this.state.error_message}
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 20 }}>
          {this.state.file != null && (
            <div className="row file_details">
              <h4> File Details </h4>
              <hr />
              <p className="">
                {" "}
                <b>File Name: </b> {this.state.file["name"]}
              </p>
              <p className="">
                {" "}
                <b>File Size: </b>
                {(this.state.file["size"] / (1024 * 1024)).toFixed(2)} MB
              </p>
              <p className="">
                {" "}
                <b>File Type: </b>
                {this.state.file["type"]}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FileUpload;
