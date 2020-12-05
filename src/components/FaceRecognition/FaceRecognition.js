import React from 'react';
import 'tachyons';
import './FaceRecognition.css';
const FaceRecognition = ({ imgUrl, boundingBox }) => {
    return (
        <div className="" style={{display:'flex', justifyContent:'center'}}>
            <div className="tc mt3 absolute">
                <img alt='' src={imgUrl} id="face-image"></img>
                <div className="bounding-box" style={boundingBox}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;