import React from "react";
import ShareOption from "./share";
import { Alert } from "react-bootstrap";
import CryptoJS from "crypto-js";
import { saveAs } from "file-saver";

class SingleFileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_id: this.props.item["file_id"],
      filename: this.props.item["original_filename"],
      share_options: false,
      message: null,
      success: false,
      base_url: "https://1234.ibtehaz.xyz",
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
    window.location.reload();
  }

  handleDownloadV2(event) {
    // download files from the server.
    const download_url =
      this.state.base_url + "/share/download/v2/" + this.state.file_id;

    fetch(download_url)
      .then((res) => {
        return Promise.all([res.json(), res.status]);
      })
      .then(([response, status]) => {
        console.log(status);
        const filename = response.filename;
        console.log(filename);

        if (status === 200) {
          const content = atob(response.content);
          const fileType = response.file_type;
          const key = CryptoJS.enc.Utf8.parse('super-secret-encryption-key');
          const decryptedContents = CryptoJS.AES.decrypt(
            content,
            key,
          ).toString(CryptoJS.enc.Utf8);
          // Create a Blob object from the decrypted file contents
          const blob = new Blob([decryptedContents], { type: fileType });

          // Save the Blob object as a file using the FileSaver library
          saveAs(blob, filename);
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          success: false,
          message: "File not found",
        });
      });
  }

  render() {
    const item = this.props.item;
    const uploaded_at = new Date(item["uploaded_at"]).toLocaleString("en-GB");

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
                {" "}
                Uploaded At:{" "}
              </p>{" "}
              <small className="" style={{ width: "fit-content" }}>
                {" "}
                {uploaded_at}{" "}
              </small>
            </span>
            <span className="row">
              <p className="h6" style={{ width: "fit-content" }}>
                {" "}
                Uploaded By:{" "}
              </p>
              <small style={{ width: "fit-content" }}>Add email here</small>
            </span>
          </div>

          <div
            className="row"
            style={{ paddingBottom: "5px", paddingTop: "5px" }}
          >
            {/* file download, share and delete options */}
            <div className="col-md-4 img_center">
              {/* download */}
              <i
                className="gg-software-download"
                onClick={this.handleDownloadV2.bind(this)}
                style={{}}
              ></i>
            </div>

            <div className="col-md-4 img_center">
              {/* share */}
              <i
                className="gg-share"
                onClick={this.handleShareClick.bind(this)}
              ></i>
            </div>

            <div className="col-md-4 img_center">
              {/* delete */}
              <i
                className="gg-remove"
                onClick={this.handleRemove.bind(this)}
              ></i>
            </div>
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
