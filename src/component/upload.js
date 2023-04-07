import "./../css/App.css";
import React from "react";
import axios from "axios";
import { Alert, ProgressBar } from "react-bootstrap";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isFileSelected: false,
      progress: 0,
      success_message: null,
      error_message: null,
    };
  }

  changeHandler(event) {
    this.setState({
      file: event.target.files[0],
      isFileSelected: true,
    });
  }

  handleUploadClick(e) {
    e.preventDefault();

    if (this.state.file == null) {
      this.setState({
        error_message: "You have to select a file to encrypt and upload!"
      })
      return;
    }

    const formData = new FormData();
    formData.append("file", this.state.file);

    axios
      .post("http://localhost:8000/share/upload/cde7f0fb/", formData, {
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
  }

  render() {
    return (
      <div className="file_upload">
        <div className="row test">
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
                  <Alert className="alert alert-success alert-space h6" align="center">
                    {this.state.success_message}
                  </Alert>
                )}

                {/* error message here */}
                {this.state.error_message && (
                  <Alert className="alert alert-danger alert-space h6" align="center">
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
