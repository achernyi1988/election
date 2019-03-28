import React, {Component} from 'react';
import Graph from "./ChartBar/Graph"
import {getElectionResult, getElectorateVoted} from "../redux/action"
import {connect} from "react-redux"
import history from "../history"


class Result extends Component {

    componentDidMount() {
        this.props.getElectionResult();
        this.props.getElectorateVoted();
    }

    onHome() {
        history.push("/");
    }

    render() {
        console.log("Result:render props", this.props);

        const {candidates, electorateVoted} = this.props;

        if(!candidates || candidates.length === 0 ||
           !electorateVoted || electorateVoted.length === 0){
            return(
                <div className="padding-100 container ui">
                    <p>Загужаються результаты выборов. Пождите, пожалуйста.</p>
                </div>
            )
        }
        return (
            <div className="padding-100">
                <Graph candidates={candidates} electorateVoted = {electorateVoted.length}/>
                <div className="home-btn container ui">
                    <button className="ui labeled icon button" onClick={this.onHome}><i className="arrow left icon"></i> Вернуться на Главную </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps candidates_result", state);
    return {candidates: state.candidates_result.arr,
        electorateVoted: state.electorate_voted.arr}
}

export default connect(mapStateToProps, {getElectionResult, getElectorateVoted})(Result);