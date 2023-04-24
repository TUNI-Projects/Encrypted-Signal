import "./../css/App.css";
import React from "react";
import axios from "axios";
import { Alert, ProgressBar } from "react-bootstrap";
import CryptoJS from "crypto-js";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isFileSelected: false,
      progress: 0,
      success_message: null,
      error_message: null,
      base_url: process.env.REACT_APP_API_SERVER,
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
    const username = "cde7f0fb";
    const upload_url = this.state.base_url + "/share/upload/" + username + "/";

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
      const fileContents = fileReader.result;
      const encryptedContents = CryptoJS.AES.encrypt(
        fileContents,
        "super-secret-encryption-key",
      ).toString();

    const formData = new FormData();
    // formData.append("file", this.state.file);
    formData.append("encrypted_data", encryptedContents);
    formData.append("filename", this.state.file["name"]);

    if (shared_email !== "") {
      formData.append("shared_email", shared_email);
    }
    console.log(formData);

    axios
      .post(upload_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          this.setState({
            progress: Math.round((100 * data.loaded) / data.total),
          });
        },
      })
      .then(
        (result) => {
          console.log(result["data"]);
          console.log(result.status);
          if (result.status === 201) {
            this.setState({
              file: null,
              isFileSelected: false,
              progress: 100,
              success_message: result["data"]["message"],
            });
          } else {
            this.setState({
              error_message: result["data"]["message"],
            });
          }
        },
        (error) => {
          this.setState({
            error_message: error,
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
                )}
                <button className="btn btn-primary btn_upload" type="submit">
                  Upload
                </button>
              </form>

              <div className="upload_status">
                {/* upload progress bar */}
                <ProgressBar
                  className="progress_bar"
                  now={this.state.progress}
                  label={`${this.state.progress}%`}
                />
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
          <hr />
          {this.state.file != null && (
            <div className="row file_details">
              <h4> File Details </h4>
              <p className=""> File Name: {this.state.file["name"]}</p>
              <p className=""> File Size: {this.state.file["size"]} bytes</p>
              <p className=""> File Type: {this.state.file["type"]}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FileUpload;
