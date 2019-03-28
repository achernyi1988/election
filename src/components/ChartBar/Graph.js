import React, {Component} from 'react';
import "./chartBar.css"

import Line from "./Line"
import BarTextContent from "./BarTextContent";
import Bar from "./Bar";
import PercentageBottom from "./PercentageBottom"

class Graph extends Component {


    renderBars() {
        const {candidates} = this.props;

        let sumOfAllVoters = candidates.reduce((total, candidate) => {
            return total + Number(candidate.voteCounter);
        }, 0)

        return candidates.map((candidate) => {
            const percent = (candidate.voteCounter / sumOfAllVoters) * 100;

            return (
                <Bar
                    percent={Math.round(percent * 10 ) / 10}
                    length={candidates.length}
                    key={candidate.fullName}
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

    render() {
        return (
            <div className={"ui container"}>
            <h1>Результаты текущего голосования</h1>
                <h2> На данный момент всего проголосовало  {" " + this.props.electorateVoted} избирателей </h2>
                <div className={"graph"}>

                    <BarTextContent candidates={this.props.candidates} />
                    <div className={"bar-lines-container"}>
                        {this.renderLines()}
                        <span>
                            {this.renderBars()}
                        </span>
                    </div>

                    <PercentageBottom>  </PercentageBottom>
                </div>
            </div>

        )
    }
}

export default Graph;