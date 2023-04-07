import React from "react";

class SingleFileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_id: this.props.item["file_id"],
      filename: this.props.item["original_filename"],
    };
  }

  handleDownload(event) {
    const download_url =
      "http://127.0.0.1:8000/share/download/cde7f0fb/" + this.state.file_id;

      fetch(download_url).then((response) => {
        if (!response.ok) {
          // console.log(response.body);
          throw new Error(response.statusText);
        } else {
          return response.blob()
        }
      }).then((blob) => {
        if (blob["type"] === "application/json") {
          //do something here
          console.log("error occurred!")
          return
        }
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        console.log(url);
        a.href = url;
        a.download = this.state.filename;
        a.click();
      }).catch((error) => {
        console.log('error: ' + error);
      });
  }

  render() {
    const item = this.props.item;
    const uploaded_at = item["uploaded_at"];

    return (
      <ul className="file_ul">
        <div className="row file_item">
          <div className="col-md-8">
            <p align="left" className="h6">
              {this.state.filename}
            </p>
            <small align="left">Uploaded at: {uploaded_at}</small>
          </div>
          <div className="col-md-4">
            <div className="row" align="center">
              <div className="col-sm-4">
                <i
                  className="gg-software-download vertical-center"
                  onClick={this.handleDownload.bind(this)}
                ></i>
              </div>

              <div className="col-sm-4">
                {/* <button className="btn btn-primary vertical-center" type="submit" download={filename}> Download</button> */}
                <i className="gg-remove vertical-center"></i>
              </div>

              <div className="col-sm-4">
                <i className="gg-share vertical-center"></i>
              </div>
            </div>
          </div>
        </div>
      </ul>
    );
  }
}

export default SingleFileView;
