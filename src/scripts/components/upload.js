import React from "react";
import logo from '../../images/logo.png'

const Upload = (props) => {
    return (
        <React.Fragment>
            <div class='upload-flex'>
                <input type="file" className="btn btn-info btn-clear" id="fileUpload" />
                <input type="button" className="btn btn-info btn-clear" id="upload" value="Upload" onClick={() => props.uploadFile()} />
            </div>
        </React.Fragment>
    )
};

export default Upload;
