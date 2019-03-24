import React, {Component} from 'react';
import Graph from "./ChartBar/Graph"
import {getElectionResult} from "../redux/action"
import {connect} from "react-redux"
import history from "../history"


class Admin extends Component {

    componentDidMount() {
        this.props.getElectionResult();
    }

    onHome() {
        history.push("/");
    }

    render() {
        return (
            <div>
                <Graph candidates={this.props.candidates}/>
                <div style={{marginTop: 10 + "%"}}>
                    <button onClick={this.onHome}> Back to home</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps candidates_result", state.candidates_result.arr);
    return {candidates: state.candidates_result.arr}
}

export default connect(mapStateToProps, {getElectionResult})(Admin);