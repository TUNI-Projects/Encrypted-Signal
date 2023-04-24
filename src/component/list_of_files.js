import "./../css/App.css";
import React from "react";
import SingleFileView from "./file";
import Cookies from "js-cookie";

class ListOfFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      total: 0,
      base_url: process.env.REACT_APP_API_SERVER,
    };
  }

  getUploadedFiles(event) {
    const username = "cde7f0fb";
    const upload_url = this.state.base_url + "/share/uploaded_files/" + username;
    
  //   "X-CSRFToken": Cookies.get("csrftoken"),
  // },
  // credentials: "same-origin",
  const requestOptions = {
    method: "GET",
    credentials: "same-origin",
  };

    fetch(upload_url, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.hasOwnProperty("files")) {
            this.setState({
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
        {/* header section */}
        <div className="row upload_section_row">
          <div className="col-lg-8">
            <h4 className="vertical-center"> Your Files</h4>
          </div>

          <div className="col-lg-4 right_align">
            <h6 className="vertical-center total_files"> {this.state.total}</h6>
          </div>
        </div>
        <hr />
        {/* list of files - scroll area */}
        <div className="list_of_files overflow-auto">
          {this.state.uploadedFiles.map((value, index) => {
            return <SingleFileView item={value} key={index}></SingleFileView>;
          })}
        </div>
      </div>
    );
  }
}

export default ListOfFiles;
