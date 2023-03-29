import "./../css/App.css";
import React from "react";

class ListOfFiles extends React.Component {
  render() {
    return (
      <div>
        <ul className="file_ul">
          <div className="row">
            <div className="col-md-8"> 
            <p align="left">File name and details</p>
            </div>
            <div className="col-md-4">
              <button className="btn btn-primary"> Download</button>
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

export default ListOfFiles;
