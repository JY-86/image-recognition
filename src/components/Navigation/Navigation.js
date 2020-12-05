import React from 'react';
import 'tachyons';

const Navigation = ({ signedIn }) => {
    return (
        <nav style={{display:'flex', justifyContent:'flex-end', }}>
            { !signedIn 
            ? <>
                <p className="f3 link dim black underline pa3 pointer ma0">Sign In</p>
                <p className="f3 link dim black underline pa3 pointer ma0">Register</p>
            </>
            : <p className="f3 link dim black underline pa3 pointer ma0">Sign Out</p>
            }
            
        </nav>
    )
}

export default Navigation;