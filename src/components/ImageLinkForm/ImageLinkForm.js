import React from 'react';
import 'tachyons';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div style={{display:"flex", alignItems:'center', flexDirection:'column'}}>
            <p className="f3">Enter an image below. The program will recognise any faces within the image</p>
            <div style={{}} className="pa4 br3 shadow-5 form">
                <input type="text" placeholder="Enter image url" className="w-70" onChange={onInputChange}></input>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onSubmit}>Analyze</button>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;