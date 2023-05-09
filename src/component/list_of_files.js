import React from "react";
import "./../css/App.css";
import SingleFileView from "./file";

class ListOfFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [],
      sharedFiles: [],
      total: 0,
      // base_url: "https://1234.ibtehaz.xyz",
      base_url: "http://127.0.0.1:8000",
      myFile: true,
      shareFile: false,
      message: null,
    };
  }

  getUploadedFiles(event) {
    const upload_url = this.state.base_url + "/share/uploaded_files/";

    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
            this.setState({
              message: result.message,
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            message: error.message,
          });
        }
      );
  }

  getSharedFiles(event) {
    const sharedUrl = this.state.base_url + "/share/shared_files/";

    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(sharedUrl, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.hasOwnProperty("shared_files")) {
            this.setState({
              sharedFiles: result["shared_files"],
              total: result["shared_files"].length,
            });
          } else {
            this.setState({
              message: result.message,
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            message: error.message,
          });
        }
      );
  }

  componentDidMount() {
    this.getUploadedFiles();
  }

  myFileClicked(event) {
    this.setState({
      myFile: true,
      shareFile: false,
    });
    this.getUploadedFiles();
  }

  shareFileClicked(event) {
    this.setState({
      myFile: false,
      shareFile: true,
    });
    this.getSharedFiles();
  }

  render() {
    return (
      <div className="">
        {/* header section */}
        <div className="row upload_section_row">
          <div className="col-lg-4">
            {/* default section */}
            <h4
              className={
                this.state.myFile
                  ? "vertical-center file_list_active"
                  : "vertical-center file_list_passive"
              }
              style={{
                padding: "5px",
                border: "1px",
                borderColor: "#9400D1",
                borderRadius: "10px",
                borderStyle: "solid",
                marginRight: "5px",
              }}
              onClick={this.myFileClicked.bind(this)}
            >
              Your Files
            </h4>
          </div>

          <div className="col-lg-4">
            {/* default section */}
            <h4
              className={
                this.state.shareFile
                  ? "vertical-center file_list_active"
                  : "vertical-center file_list_passive"
              }
              style={{
                padding: "5px",
                border: "1px",
                borderColor: "#9400D1",
                borderRadius: "10px",
                borderStyle: "solid",
                marginRight: "5px",
              }}
              onClick={this.shareFileClicked.bind(this)}
            >
              Shared Files
            </h4>
          </div>

          <div className="col-lg-4 right_align">
            <h6 className="vertical-center total_files"> {this.state.total}</h6>
          </div>
        </div>
        <hr />

        {/* list of files - scroll area */}
        {this.state.myFile && (
          <div className="list_of_files overflow-auto">
            {this.state.uploadedFiles.length === 0 && (
              <div>
                <h1 style={{ color: "#9400D1" }}> WOW!</h1>
                <p className="h6">
                  {" "}
                  If you upload something, it will appear here!
                </p>
                <small> {this.state.message} </small>
              </div>
            )}

            {this.state.uploadedFiles.map((value, index) => {
              return (
                <SingleFileView
                  item={value}
                  key={index}
                  type="own"
                ></SingleFileView>
              );
            })}
          </div>
        )}

        {this.state.shareFile && (
          <div className="list_of_files overflow-auto">
            {this.state.sharedFiles.length === 0 && (
              <div>
                <h1 style={{ color: "#9400D1" }}> Sorry!</h1>
                <p className="h6">Nothing shared with you yet!</p>
              </div>
            )}

            {this.state.sharedFiles.map((value, index) => {
              return (
                <SingleFileView
                  item={value}
                  key={index}
                  type="shared"
                ></SingleFileView>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default ListOfFiles;
