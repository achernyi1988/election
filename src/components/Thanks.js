import React from "react"
import {connect} from "react-redux"
import history from "../history"
import {Container, Progress} from 'semantic-ui-react'


class Thanks extends React.Component {

    state = {
        percent: 0
    }

    componentDidMount() {
        this.progressBarIncreasing();
    }

    progressBarIncreasing = () => {
 
        this.interval = setInterval(() => {
            console.log("progressBarIncreasing");

            if (this.state.percent < 100) {
                this.setState({percent: this.state.percent + 1})
            } else {
                clearInterval(this.interval);
                history.push("/");
            }

        }, 100)
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }


    render() {

        if (!this.props.current_voter.text || !this.props.current_candidate.text) {
            return <div>No correct data available. Go to home page</div>
        }

        return (
            <Container>
                Thanks,{" " + this.props.current_voter.text} for a vote which is
                {" " + this.props.current_candidate.text}
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
        current_voter: state.current_voter,
        current_candidate: state.current_candidate
    }
}
export default connect(mapStateToProps)(Thanks);