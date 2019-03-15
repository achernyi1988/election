import React from "react"
import ipfs from "../ethereum/api/ipfs_client"
import json from '../electorate/electorate.json';
import {setIPFSHash, getIPFSHash, setCurrentElectorate} from "../redux/action"
import {connect} from "react-redux"
import {Button, Container, Select, Form} from 'semantic-ui-react'
import _ from 'lodash'

import {Field, reduxForm} from "redux-form"

class Electorate extends React.Component {

    state = {
        persons: []
    }

    componentDidMount() {
        this.props.getIPFSHash();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.ipfs_hash !== nextProps.ipfs_hash) {
            ipfs.files.cat(nextProps.ipfs_hash)
                .then(persons => {
                    this.setPersons(persons);
                    //this.props.initialize({value: "Gena"});
                });
        }
    }

    setPersons = (persons) => {
        const personsOptions = _.map(JSON.parse(persons), person => ({
                key: person.id,
                text: person.name,
                value: person.id,
                password: person.password
            })
        )
        this.setState({persons: personsOptions});
    }

    createIPFSHash = () => {
        ipfs.files.add(Buffer.from(JSON.stringify(json)))
            .then(res => {
                const hash = res[0].hash;

                this.props.setIPFSHash(hash);
                console.log('added data hash:', hash)
                return ipfs.files.cat(hash)
            })
            .then(persons => {
                this.setPersons(persons);
                console.log('retrieved data:', JSON.parse(persons))
            })
    }


    handleChange = (e, item) => {


        console.log("handleChange value ", item);

        console.log("handleChange item  ", _.find(this.state.persons, ['value', item]));

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
        const className = `field ${(formProps.meta.touched && formProps.meta.error) ? "error" : "" }`;
        console.log("renderField formProps ", formProps);
        console.log("renderField", className);
        return (
            <div className={className}>
                <label> {formProps.label} </label>
                <input
                    {...formProps.input}
                />
                {this.renderError(formProps.meta)}
            </div>
        )
    }

    onSubmit = (value) => {
        console.log("onSubmit value ", value);

        const electorate =  _.find(this.state.persons, ['value', value.electorate]);
        this.props.setCurrentElectorate(electorate);
    }

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props;
        console.log("render value ", this.props);
        return (
            <div className="ui grid">
                <div className="four wide column">
            <Container fluid={false}>
                <form className={"ui form error"} onSubmit={handleSubmit(this.onSubmit)}>
                    {/*<Select placeholder={"input your name"} onChange={this.handleChange} options={this.state.persons}/>*/}


                    <Field name="electorate" component="select">
                        <option value={"choose yourself"} >choose yourself </option>
                        {this.state.persons.map((person) => {

                            const inactive = (person.password === "5");
                            return(
                            <option key={person.key} value={person.value} disabled={inactive} >{person.text}</option>
                            )
                        })}
                    </Field>
                    <Field name="password" type="password" component={this.renderField} label="Password"/>
                    <div>
                        <button type="submit" disabled={submitting}>Log In</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>
            </Container>
                </div>
            </div>
        )
    }
}

const validate = (values) => {
    console.log("validate", values);
    const errors = {}

    if (!values.password) {
        errors.password = "you must enter a password";
    }

    else if (values.password.length > 1) {
        errors.password = "must be 1 characters or less"
    }

    //
    // if(!values.description){
    //     errors.description = "you must enter a description";
    // }
    // else if(values.description.length > 50){
    //     errors.description = "must be 50 characters or less"
    // }

    return errors;

}

const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {ipfs_hash: state.ipfs_hash.ipfsHashAv}
}


export default reduxForm({form: "ElectorateForm",
    validate})(connect(mapStateToProps, {
    setIPFSHash,
    getIPFSHash,
    setCurrentElectorate
})(Electorate));