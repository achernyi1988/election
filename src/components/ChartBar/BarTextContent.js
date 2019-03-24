import React from "react"

const BarTextContent = ({candidates}) => {
    return (
        <div className={"bar-text-content"}>
            {
                candidates.map((candidate, i) => {
                    return (
                        <div key={i} className={"text"} style={{height: 100/candidates.length + "%"}}>
                            <h3>{candidate.fullName}</h3>
                        </div>)
                })
            }
        </div>
    )
}

export default BarTextContent;