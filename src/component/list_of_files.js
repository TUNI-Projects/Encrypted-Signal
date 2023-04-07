import "./../css/App.css";
import React from "react";
import SingleFileView from "./file";

class ListOfFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      total: 0,
    };
  }

  getUploadedFiles(event) {
    fetch("http://localhost:8000/share/uploaded_files/cde7f0fb/")
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.hasOwnProperty("files")) {
            this.setState(
              {
                uploadedFiles: result["files"],
                total: result["total"],
              });
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
      <div className="">
        <div className="row upload_section_row">
          <div className="col-lg-8">
            <h4 className="vertical-center"> Your Files</h4>
          </div>

          <div className="col-lg-4 right_align">
            <h6 className="vertical-center total_files"> {this.state.total}</h6>
          </div>

        </div>
        <hr />
        {this.state.uploadedFiles.map((value, index) => {
          return <SingleFileView item={value} key={index}></SingleFileView>;
        })}
      </div>
    );
  }
}

export default ListOfFiles;
