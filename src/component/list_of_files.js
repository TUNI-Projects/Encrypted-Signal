import "./../css/App.css";
import React from "react";
import SingleFileView from "./file";

class ListOfFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
    };
  }

  getUploadedFiles() {
    fetch("http://localhost:8000/share/uploaded_files/cde7f0fb/")
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.hasOwnProperty("files")) {
            this.setState(
              {
                uploadedFiles: result["files"],
              },
              function () {
                console.log(this.state.uploadedFiles);
                console.log(this.state);
              }
            );
          } else {
            const message = "Invalid Request!";
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
        }
      );
  }

  componentDidMount() {
    this.getUploadedFiles();
  }

  render() {
    return (
      <div>
        <h4 style={{ margin: 10 }}> Uploaded Files</h4>
        <hr />
        {this.state.uploadedFiles.map((value, index) => {
          return <SingleFileView item={value} key={index}></SingleFileView>;
        })}
      </div>
    );
  }
}

export default ListOfFiles;
