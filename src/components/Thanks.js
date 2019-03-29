import React from "react"
import {connect} from "react-redux"
import history from "../history"
import { Progress} from 'semantic-ui-react'
import {getCurrentElectorate} from "../redux/action"

class Thanks extends React.Component {

    state = {
        percent: 0
    }

    componentDidMount() {
        this.props.getCurrentElectorate();

        this.progressBarIncreasing();
    }

    componentDidUpdate(prevProps){
        if(prevProps.is_vote_processed !== this.props.is_vote_processed){
            if(true === this.props.is_vote_processed){
                console.log("vote was written to smart contract. switch to result")
                history.push("/result");
            }
        }

    }

    progressBarIncreasing = () => {
 
        this.interval = setInterval(() => {
            console.log("progressBarIncreasing");

            if (this.state.percent < 100) {
                this.setState({percent: this.state.percent + 1})
            }

        }, 150) //15 seconds
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    render() {
        console.log("Thanks:render this.props.current_voter.text", this.props.current_voter.text);
        if (!this.props.current_voter.text) {
            return(
                <div className="padding-100 container ui">
                    <p>Обрабатываються данные! Подождите, пожалуйста</p>
                </div>
            )
        }

        return (
            <div className="padding-100 container ui list-candidates">
                <h3>Спасибо,<span>{" " + this.props.current_voter.text}</span> за Ваш голос !</h3>
                <p>Подождите, пожалуйста, загружаються результаты выборов на текущий момент времени.</p>
                <div>
                    <Progress percent={this.state.percent} indicating progress/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        current_voter: state.current_voter,
        is_vote_processed: state.is_vote_processed
    }
}
export default connect(mapStateToProps, {getCurrentElectorate})(Thanks);