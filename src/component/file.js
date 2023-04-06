import React from "react";

class SingleFileView extends React.Component {

    render() {
        const item = this.props.item;
        console.log(item);
        
        const filename = item["original_filename"];
        const filepath = "http://127.0.0.1:8000/media/" + item["file_path"];
        const uploaded_at = item["uploaded_at"];



        return (
            <ul className="file_ul">
            <div className="row file_item">
              <div className="col-md-8">
                <p align="left"  className="h6">{filename}</p>
                <small align="left">Uploaded at: {uploaded_at}</small>
              </div>
              <div className="col-md-4">
                <form method="get" action={filepath}>
                <button className="btn btn-primary vertical-center" type="submit" download={filename}> Download</button>
                </form>
            </div>
            </div>
          </ul>
        );
    }
}

export default SingleFileView;