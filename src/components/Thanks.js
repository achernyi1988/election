import React from "react"
import {connect} from "react-redux"
import history from "../history"
import {Container, Progress} from 'semantic-ui-react'
import {getCurrentElectorate} from "../redux/action"

class Thanks extends React.Component {

    state = {
        percent: 0
    }

    componentDidMount() {
        this.props.getCurrentElectorate();

        this.progressBarIncreasing();
    }

    progressBarIncreasing = () => {
 
        this.interval = setInterval(() => {
            console.log("progressBarIncreasing");

            if (this.state.percent < 100) {
                this.setState({percent: this.state.percent + 1})
            } else {
                clearInterval(this.interval);
                history.push("/result");
            }

        }, 150) //15 seconds
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    render() {
        console.log("Thanks:render this.props.current_voter.text", this.props.current_voter.text);
        if (!this.props.current_voter.text) {
            return <div>Обрабатываються данные! Подождите, пожалуйста</div>
        }

        return (
            <Container>
                Спасибо,{" " + this.props.current_voter.text} за Ваш голос !
                Подождите, пожалуйста загружаються результаты выборов на текущий момент времени
                <div>
                    <Progress percent={this.state.percent} indicating progress/>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        current_voter: state.current_voter
    }
}
export default connect(mapStateToProps, {getCurrentElectorate})(Thanks);