import React from 'react';


const BottomInfo = () => {
    const markerArr = Array(11).fill(null);

    return (
        <div className="markers">
            {
                markerArr.map((el, i) => (
                    <span className="marker" style={{ left: `${i * 10}%` }}>
          { i * 10 }
         </span>
                ))
            }
        </div>
    )
}

export default BottomInfo;