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
        console.log("Admin:render props", this.props);
        if(!this.props.candidates || this.props.candidates.length === 0){
            return <div>no candidates. Wait. Loading ...</div>;
        }
        return (
            <div className="padding-100">
                <Graph candidates={this.props.candidates}/>
                <div className="home-btn container ui">
                    <button className="ui labeled icon button" onClick={this.onHome}><i className="arrow left icon"></i> Вернуться на Главную </button>
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