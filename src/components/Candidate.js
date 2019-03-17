import React from "react"
import {getCandidates, getElectorateVoted, getIPFSHash, setCurrentElectorate, setIPFSHash} from "../redux/action"
import {connect} from "react-redux"
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import {Field, reduxForm} from "redux-form"
import {Button, Container} from 'semantic-ui-react'

class Candidate extends React.Component {


    componentDidMount() {
        this.props.getCandidates();
    }

    renderRadioButtons = () => {
        if (!this.props.candidates) {
            return null;
        }
        return (<Container>
            <label>Candidates</label>
            {this.props.candidates.map((candidate) => {
                return <div key={candidate.fullName}>
                    <label>
                        <Field name="candidates" component="input" type="radio" value={candidate.fullName}/>
                        {candidate.fullName}
                    </label>
                </div>
            })}
        </Container>)
    }
    onSubmit = (value) => {
        console.log("onSubmit", value);
    }

    render() {
        console.log("props = ", this.props)

        const { pristine, reset, submitting} = this.props;

        return (
            <div>

                <form className={"ui form error"} onSubmit={this.props.handleSubmit(this.onSubmit)}>

                    {this.renderRadioButtons()}
                    <Button primary disabled={submitting}>Log In</Button>
                    <Button negative disabled={pristine || submitting} onClick={reset}>Clear
                        Values </Button>

                </form>
                {/*<button onClick={this.vote}> Vote </button>*/}
                {/*<button onClick={this.getNoOfVotes}> Get numbers</button>*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {candidates: state.candidates.arr};
}


export default reduxForm({
    form: "CandidateForm"
})(connect(mapStateToProps, {
    getCandidates
})(Candidate));