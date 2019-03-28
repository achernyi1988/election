import React from "react"
import {getCandidates, vote} from "../redux/action"
import {connect} from "react-redux"
import {Field, reduxForm, SubmissionError} from "redux-form"
import {Button, Container} from 'semantic-ui-react'
import Circle from 'react-circle';

class Candidate extends React.Component {

    state = {
        percent: 0
    }

    componentDidMount() {
        this.props.getCandidates();
    }

    renderError = ({error, touched}) => {

        if (error && touched) {

            return (
                <div className={"ui message error"}>
                    <div className={"header"}> {error} </div>
                </div>
            )
        }
    }

    renderField = (formProps) => {
        console.log("renderField", formProps);
        const className = `field ${(formProps.meta.touched && formProps.meta.error) ? "error" : "" }`;
        const inactive = (formProps.label) ? "" : "none";

        return (
            <div className={className}>
                <label style={{display: `${inactive}`}}>
                    <Field name={formProps.input.name} component="input" type={formProps.type} value={formProps.label}/>
                    {" " + formProps.label}
                </label>
                {this.renderError(formProps.meta)}
            </div>
        )
    }

    renderRadioButtons = () => {
        if (!this.props.candidates) {
            return null;
        }
        return (<div className="candidates-table">
            <h3>Список кандидатов:</h3>
            <table className="ui striped  table">

            {this.props.candidates.map((candidate) => {
                return (
                    <tr>
                    <td>
                        <div key={candidate.fullName}>
                            <label>
                                <Field name="candidates" component={this.renderField} type="radio" label={candidate.fullName}/>
                            </label>
                        </div>
                    </td>
                    </tr>
                )
            })}
            </table>
        </div>)
    }
    onSubmit = ({candidates}) => {
        console.log("onSubmit", candidates, this.props.current_voter);
        if (!this.props.current_voter.text) {
            console.log("!!!!!!!!!!!!!!!!!error  onSubmit");
            throw new SubmissionError({
                voter_unavailable: 'no voter available',
                _error: 'voter failed!'
            })
        }
        if (this.props.current_voter) {
            this.props.vote(candidates, this.props.current_voter.value, this.onVote);
        }
    }

    onVote = () => {
        console.log("onVote in progress");

        this.interval = setInterval(() => {
            if (this.state.percent < 100) {
                this.setState({percent: this.state.percent + 1})
            } else {
                clearInterval(this.interval);
            }

        }, 200)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderVoter = () => {

        return (
            <div className="welcome-message">
                <p>Участие в выборах является свободным и добровольным.</p>
                <p>Никто не вправе принуждать граждан голосовать за кого-либо из кандидатов, а также препятствовать свободному волеизъявлению избирателей.</p>
                <p> Пожалуйста выберите кандидата из списка и проголосуйте. </p>
                <p> ВНИМАНИЕ! Вы можете проголосовать только за одного кандидата или выбрать пункт "Против Всех" </p>
            </div>
        )
    }

    render() {
        const {pristine, reset, submitting} = this.props;

        return (
            <div className="ui container padding-100 list-candidates">
                <h3> Приветствуем, <span>{this.props.current_voter.text}</span>!</h3>
                <div className="ui equal width grid">
                    <div className="row">
                        <div className="column">
                            {this.renderVoter()}
                        </div>
                        <div className="column">
                            <form className={"ui form error"} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                                        {this.renderRadioButtons()}
                                <div className="ui buttons" style={{marginTop: 50 + "px"}}>
                                    <Button primary disabled={submitting}>Проголосовать</Button>
                                    <div className="or"></div>
                                    <Button disabled={pristine || submitting} onClick={reset}>Очистить </Button>
                                </div>
                                <label>
                                    <Field name="voter_unavailable" component={this.renderField}/>
                                </label>
                                <Container>
                                    <label style={{display: `${this.state.percent ? "" : "none"}`}}>
                                        <Circle progress={this.state.percent}/>
                                    </label>
                                </Container>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {
        candidates: state.candidates.arr,
        current_voter: state.current_voter
    };
}


export default reduxForm({
    form: "CandidateForm"
})(connect(mapStateToProps, {
    getCandidates,
    vote
})(Candidate));