import React from 'react';
import 'tachyons';

const FaceRecognition = ({ imgUrl }) => {
    return (
        <div className="tc">
            <img alt='submitted image' src={URL(imgUrl)}></img>
        </div>
    )
}

export default FaceRecognition;