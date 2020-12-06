import React from 'react';
import 'tachyons';
import './FaceRecognition.css';
const FaceRecognition = ({ imgUrl, boundingBoxes }) => {

    return (
        <div className="" style={{display:'flex', justifyContent:'center'}}>
            <div className="tc mt3 absolute">
                <img alt='' src={imgUrl} id="face-image"></img>
                {
                    boundingBoxes.map(i => <div className="bounding-box" style={i}></div>)
                }
            </div>
        </div>
    )
}

export default FaceRecognition;