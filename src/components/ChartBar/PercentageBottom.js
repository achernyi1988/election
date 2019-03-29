import React from 'react';


const PercentageBottom = ({chartData}) => {
    const markerArr = Array(chartData.lineCounter + 1).fill(null);

    return (
        <div className="botton-info">
            {
                markerArr.map((el, i) => (
                    <span key={i} className="botton-info" style={{ left: `${chartData.linePercentageArr[i] * chartData.multiplyWidth}%` }}>
          { chartData.linePercentageArr[i] }
         </span>
                ))
            }
        </div>
    )
}

export default PercentageBottom;
