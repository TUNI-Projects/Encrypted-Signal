import "./../css/App.css";
import React from "react";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      isFileSelected: false,
    };
  }

  changeHandler(event) {
    this.setState({
      file: event.target.files[0],
      isFileSelected: true,
    });
    // console.log(event.target.files[0]);
  }

  handleUploadClick(e) {
    const formData = new FormData();
    formData.append("file", this.state.file);

    fetch("http://localhost:8000/share/upload/cde7f0fb/", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );

    // e.preventDefault();
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
            </div>
          </div>
        </div>

        <div className="row" style={{marginTop: 20}}>
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
