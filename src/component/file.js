import React from "react";

class SingleFileView extends React.Component {
  render() {
    const item = this.props.item;

    const filename = item["original_filename"];
    const filepath = "http://127.0.0.1:8000/media/" + item["file_path"];
    const uploaded_at = item["uploaded_at"];

    return (
      <ul className="file_ul">
        <div className="row file_item">
          <div className="col-md-8">
            <p align="left" className="h6">
              {filename}
            </p>
            <small align="left">Uploaded at: {uploaded_at}</small>
          </div>
          <div className="col-md-4">
            <div className="row" align="center">
              <div className="col-sm-4">
                <i
                  className="gg-software-download vertical-center"
                  type="submit"
                  download={filename}
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
