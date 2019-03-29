import React, {Component} from 'react';
import "./chartBar.css"

import Line from "./Line"
import BarTextContent from "./BarTextContent";
import Bar from "./Bar";
import PercentageBottom from "./PercentageBottom"
import ChartBarConfig from "./ChartBarConfig"


class Graph extends Component {

    chartBarManager = new ChartBarConfig();

    getSumOfAllVoters(candidates){
        return  candidates.reduce((total, candidate) => {
            return total + Number(candidate.voteCounter);
        }, 0)
    }


    getPercent(voteCounter , sumOfAllVoters){
       return  (  Number(voteCounter) / sumOfAllVoters) * 100;
    }


    calculateChart = () =>{
        let sumOfAllVoters = this.getSumOfAllVoters(this.props.candidates);

        console.log("calculateChart: sumOfAllVoters", sumOfAllVoters);

        const percent = this.getPercent(this.props.candidates[0].voteCounter, sumOfAllVoters);
        console.log("calculateChart: percent", percent);

        this.chartBarManager.calculateChart(percent);

        console.log("Graph:calculateChart", this.chartBarManager.chartData);

        this.forceUpdate();
    }

    componentDidMount(){

        console.log("componentDidMount:", this.props);
            this.calculateChart();



    }

    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate:", this.props.candidates);
        if (this.props.candidates !== prevProps.candidates) {

            this.calculateChart();

            console.log("Graph:componentDidUpdate", this.chartBarManager.chartData);


        }

    }

    renderBars() {
        const {candidates} = this.props;

        let sumOfAllVoters = this.getSumOfAllVoters(candidates);

        return candidates.map((candidate) => {
            const percent = this.getPercent(candidate.voteCounter,sumOfAllVoters);

            return (
                <Bar
                    multiplyWidth = {this.chartBarManager.chartData.multiplyWidth}
                    percent={Math.round(percent * 10) / 10}
                    length={candidates.length}
                    key={candidate.fullName}
                />
            )
        })
    }

    renderLines() {
        const chartData = this.chartBarManager.chartData;
        return Array(chartData.lineCounter).fill(null).map((el, i) => {
                return <Line
                    left={chartData.linePercentageArr[i] * chartData.multiplyWidth} key={i}
                />
            }
        )
    }

    render() {
        console.log("render", this.chartBarManager);
        return (
            <div className={"ui container"}>
                <h1>Результаты текущего голосования</h1>
                <h2> На данный момент всего проголосовало {" " + this.props.electorateVoted} избирателей </h2>
                <div className={"graph"}>

                    <BarTextContent candidates={this.props.candidates}/>
                    <div className={"bar-lines-container"}>
                        {this.renderLines()}
                        <span>
                            {this.renderBars()}
                        </span>
                    </div>

                    <PercentageBottom chartData = {this.chartBarManager.chartData}>
                    </PercentageBottom>
                </div>
            </div>

        )
    }
}

export default Graph;