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
    })
  }

  handleUploadClick(e) {
    const formData = new FormData();
    formData.append("file", this.state.file);

    fetch("http://localhost:8000/share/upload/cde7f0fb/", {
      method: "POST",
      body: formData,
    }).then((res) => res.json())
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
        <h4> Upload Files</h4>
        <hr />

        <div className="form-control dropzone file_upload_bg" id="dropzone">
          <div className="center_middle">
            <form onSubmit={this.handleUploadClick.bind(this)}>
            <input name="file" type="file" onChange={this.changeHandler.bind(this)}/>
            <button className="btn btn-primary btn_upload" type="submit">
              Upload
            </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
