import React from 'react';


const BottomInfo = () => {
    const markerArr = Array(11).fill(null);

    return (
        <div className="botton-info">
            {
                markerArr.map((el, i) => (
                    <span className="botton-info" style={{ left: `${i * 10}%` }}>
          { i * 10 }
         </span>
                ))
            }
        </div>
    )
}

export default BottomInfo;