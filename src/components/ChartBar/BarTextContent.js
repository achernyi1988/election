import React from "react"

const BarTextContent = ({currencies}) => {
    return (
        <div className={"bar-text-content"}>
            {
                currencies.map((currency) => {
                    return (
                        <div className={"text"}>
                            {currency.currencyName}
                        </div>)
                })
            }
        </div>
    )
}

export default BarTextContent;