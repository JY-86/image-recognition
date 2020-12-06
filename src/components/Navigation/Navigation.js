import React from 'react';
import 'tachyons';

const Navigation = ({ signedIn, onRouteChange }) => {
    return (
        <nav style={{display:'flex', justifyContent:'flex-end', }}>
            { !signedIn 
            ? <>
                <p className="f3 link dim black underline pa3 pointer ma0" onClick={() => onRouteChange('signin')}>Sign In</p>
                <p className="f3 link dim black underline pa3 pointer ma0" onClick={() => onRouteChange('register')}>Register</p>
            </>
            : <p className="f3 link dim black underline pa3 pointer ma0" onClick={() => onRouteChange('signout')}>Sign Out</p>
            }
            
        </nav>
    )
}

export default Navigation;