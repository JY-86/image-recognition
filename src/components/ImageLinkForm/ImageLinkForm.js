import React from 'react';
import 'tachyons';

const ImageLinkForm = () => {
    return (
        <div className="tc">
            <p className="f3">Enter an image below. The program will recognise any faces within the image</p>
            <div style={{width:'700px', display:'flex', justifyContent:'center'}} className="pa0">
                <input type="text" placeholder="Enter image url" className="w-70"></input>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">Analyze</button>
            </div>
        </div>
        
    )
}

export default ImageLinkForm;