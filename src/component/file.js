import React from "react";
import ShareOption from "./share";

class SingleFileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_id: this.props.item["file_id"],
      filename: this.props.item["original_filename"],
      share_options: false,
    };
  }

  handleShareClick(event) {
    // change the state of share input options.
    event.preventDefault();
    let temp = !this.state.share_options;
    this.setState({
      share_options: temp
    })
  }

  handleDownload(event) {
    // download files from the server.
    const download_url =
      "http://127.0.0.1:8000/share/download/cde7f0fb/" + this.state.file_id;

    fetch(download_url)
      .then((response) => {
        if (!response.ok) {
          // console.log(response.body);
          throw new Error(response.statusText);
        } else {
          return response.blob();
        }
      })
      .then((blob) => {
        if (blob["type"] === "application/json") {
          //do something here
          console.log("error occurred!");
          return;
        }
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        console.log(url);
        a.href = url;
        a.download = this.state.filename;
        a.click();
      })
      .catch((error) => {
        console.log("error: " + error);
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
                onClick={this.handleDownload.bind(this)}
                style={{}}
              ></i>
            </div>

            <div className="col-md-4 img_center">
              {/* share */}
              <i className="gg-share" onClick={this.handleShareClick.bind(this)}></i>
            </div>

            <div className="col-md-4 img_center">
              {/* delete */}
              <i className="gg-remove"></i>
            </div>
          </div>

          {/* share email options, default visibility None, */}

          <div className={this.state.share_options ? "row share_box": "row display_none"} style={{ paddingBottom: "5px", paddingTop: "5px" }}>
            <ShareOption file_id={this.state.file_id} />
          </div>
        </div>
      </ul>
    );
  }
}

export default SingleFileView;
