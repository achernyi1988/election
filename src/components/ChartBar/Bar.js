import React from "react"

const Bar = ({multiplyWidth, percent, length}) => {


    if (0 === percent) {
        return <div className={"bar-percent-0"} style={{height: 100 / length + "%"}}/>
    }
    return (

            <div className={"bar"} style={{width: `${percent * multiplyWidth}%`, height: 100 / length + "%"}}>

                <div className={"bar-percent tooltip"}>
                    <span className={"tooltiptext"}>{percent + "%"}</span>
                </div>

            </div>


    )
}

export default Bar;