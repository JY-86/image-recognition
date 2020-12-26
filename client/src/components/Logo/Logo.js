import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import brain from './brain-logo.png';
import 'tachyons';


const Logo = () => {
    return (
        <div className="Tilt">
            <Tilt className="Tilt br2 shadow-2" options={{max: 25}} style={{width:150, height:150}}>
                <div className="Tilt-inner">
                    <img src={brain} alt="logo" style={{width:'70%', height:'70%'}}></img>
                </div>
            </Tilt>
            
        </div>
    )
}

export default Logo;