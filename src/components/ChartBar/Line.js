import React from 'react';
import "./chartBar.css"

const Line = ({left}) => {
    console.log("Line props", left);
    return (
        <div className={"line"}
             style={{left: `${left}%`}}
        />
    )
}

export default Line;