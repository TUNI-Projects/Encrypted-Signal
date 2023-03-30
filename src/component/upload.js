import "./../css/App.css";
import React from "react";

class FileUpload extends React.Component {
  render() {
    return (
      <div className="file_upload">
        <h4> Upload Files</h4>
        <hr />

        <form action="/file-upload" class="form-control dropzone file_upload_bg" id="dropzone">
          <div class="fallback">
            <input name="file" type="file" multiple />
          </div>
        </form>
      </div>
    );
  }
}

export default FileUpload;
