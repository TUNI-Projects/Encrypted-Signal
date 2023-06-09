import CryptoJS from "crypto-js";
import { saveAs } from "file-saver";
import React from "react";
import { Alert } from "react-bootstrap";
import ShareOption from "./share";
import Download from "./download";

class SingleFileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_id: this.props.item["file_id"],
      filename: this.props.item["original_filename"],
      type: this.props.type,
      share_options: false,
      password_box: false,
      message: null,
      success: false,
      // base_url: "https://1234.ibtehaz.xyz",
      base_url: "http://127.0.0.1:8000",
    };
  }

  handleShareClick(event) {
    // change the state of share input options.
    event.preventDefault();
    let temp = !this.state.share_options;
    this.setState({
      share_options: temp,
    });
  }

  handleRemove(event) {
    event.preventDefault();
    const remove_url = this.state.base_url + "/share/delete_file/";

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        file_id: this.state.file_id,
      }),
    };

    let status = null;
    fetch(remove_url, requestOptions)
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then(
        (result) => {
          if (status === 202) {
            // success
            this.setState({
              message: result["message"],
              success: true,
            });
          } else {
            // failure
            this.setState({
              message: result["message"],
              success: false,
            });
          }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            failure_msg: error,
            success: false,
          });
        }
      );

    if (this.state.success) {
      window.location.reload();
    }
  }

  showPasswordBox(event) {
    event.preventDefault();
    let temp = !this.state.password_box;
    this.setState({
      password_box: temp,
    });
  }

  render() {
    const item = this.props.item;
    const uploaded_at = new Date(item["uploaded_at"]).toLocaleString("en-GB");
    const sharedAt = new Date(item["shared_at"]).toLocaleString("en-GB");

    return (
      <ul className="file_ul">
        <div className="row">
          <div className="row" style={{ paddingTop: "5px" }}>
            <p className="h5" style={{ wordWrap: "break-word" }}>
              {this.state.filename}
            </p>
            <span className="row">
              <p
                className="h6"
                style={{ width: "fit-content", paddingBottom: "5px" }}
              >
                Uploaded On:
              </p>
              <small className="" style={{ width: "fit-content" }}>
                {uploaded_at}
              </small>
            </span>
            {this.state.type === "shared" && (
              <span className="row">
                <p
                  className="h6"
                  style={{ width: "fit-content", paddingBottom: "5px" }}
                >
                  Shared On:
                </p>
                <small className="" style={{ width: "fit-content" }}>
                  {sharedAt}
                </small>
              </span>
            )}

            {this.state.type === "own" && (
              <span className="row" style={{ paddingBottom: "5px" }}>
                <p className="h6"> Uploaded By:</p>
                <small>{item.file_owner}</small>
              </span>
            )}

            {this.state.type === "shared" && (
              <span className="row" style={{ paddingBottom: "5px" }}>
                <p className="h6"> Shared By:</p>
                <small style={{ width: "fit-content" }}>{item.shared_by}</small>
              </span>
            )}
          </div>

          {this.state.type === "own" && (
            <div
              className="row"
              style={{ paddingBottom: "5px", paddingTop: "5px" }}
            >
              {/* file download, share and delete options */}
              <div
                className="col-md-4 img_center"
                onClick={this.showPasswordBox.bind(this)}
              >
                {/* download */}
                <i className="gg-software-download"></i>
              </div>

              <div
                className="col-md-4 img_center"
                onClick={this.handleShareClick.bind(this)}
              >
                {/* share */}
                <i className="gg-share"></i>
              </div>

              <div
                className="col-md-4 img_center"
                onClick={this.handleRemove.bind(this)}
              >
                {/* delete */}
                <i className="gg-remove"></i>
              </div>
            </div>
          )}

          {this.state.type === "shared" && (
            <div
              className="row"
              style={{ paddingBottom: "5px", paddingTop: "5px" }}
            >
              <button
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={this.showPasswordBox.bind(this)}
              >
                Decrypt & Download
              </button>
            </div>
          )}

          {/* show password and download stuff */}
          <div
            className={
              this.state.password_box ? "row share_box" : "row display_none"
            }
            style={{ paddingBottom: "5px", paddingTop: "5px" }}
          >
            <Download
              file_id={this.state.file_id}
              filename={this.state.filename}
            />
          </div>

          {/* share email options, default visibility None, */}

          <div
            className={
              this.state.share_options ? "row share_box" : "row display_none"
            }
            style={{ paddingBottom: "5px", paddingTop: "5px" }}
          >
            <ShareOption file_id={this.state.file_id} />
          </div>

          {this.state.message && (
            <div className="row">
              <Alert
                className={
                  this.state.success
                    ? "alert alert-success alert-space h6"
                    : "alert alert-danger alert-space h6"
                }
                align="center"
              >
                {this.state.message}
              </Alert>
            </div>
          )}
        </div>
      </ul>
    );
  }
}

export default SingleFileView;
