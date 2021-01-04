import React from 'react';
import 'tachyons';

const Rank = (props) => {
    let {name, rank} = props;
    console.log(name, rank);
    return (
        <div className="tc">
            <div className="white f3">
                {name}, your current entry count is
            </div>
            <div className="white f1">
                #{rank}
            </div>
        </div>
        
    )
}

export default Rank;