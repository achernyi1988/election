import React from 'react';
import "./chartBar.css"

const Line = ({left}) => {
    return (
        <div className={"line"}
             style={{left: `${left}%`}}
        />
    )
}

export default Line;