import React, {Component} from 'react';
import "./chartBar.css"

import Line from "./Line"
import BarTextContent from "./BarTextContent";
import Bar from "./Bar";
import BottomInfo from "./BottomInfo"
const currencies = [
    {
        currencyName: 'Bitcoin',
        marketCap: 106330074359
    },
    {
        currencyName: 'Ethereum',
        marketCap: 32402945322
    },
    {
        currencyName: 'XRP',
        marketCap: 11864383092
    },
    {
        currencyName: 'Bitcoin Cash',
        marketCap: 9612908814
    },
    {
        currencyName: 'EOS',
        marketCap: 4644155391
    },
    {
        currencyName: 'Stellar',
        marketCap: 4084424747
    }
]

class Graph extends Component {
    state = {}

    renderBars(){

        let sumOfAllCurrencies = currencies.reduce((total, currency) => {
            return total + currency.marketCap;
        }, 0)

        return currencies.map((currency) => {
            const percent = (currency.marketCap / sumOfAllCurrencies) * 100;
            return (
                <Bar
                percent={percent}
                key={currency.currencyName}
                />
            )
        })
    }

    renderLines() {
        return Array(10).fill(null).map((el, i) => {
                return <Line
                    left={i * 10} key={i}
                />
            }
        )
    }

    renderButtomPercentage(){


        return Array(11).fill(null).map((el, i) => {
                return <BottomInfo
                    percent={i * 10} key={i}
                />
            }
        )
    }

    render() {
        return (
            <div className={"graph-wrapper"}>
                <div className={"graph"}>
                    <BarTextContent currencies={currencies}/>
                    <div className={"bar-lines-container"}>
                        {this.renderLines()}
                        {this.renderBars()}
                    </div>
                    <div style={{ width: '12%' }} />
                    <BottomInfo />
                </div>
            </div>
        )
    }
}

export default Graph;