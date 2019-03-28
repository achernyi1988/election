import React from "react"
import ipfs from "../ethereum/api/ipfs_client"
import json_file from '../electorate/electorate.json';
import {setIPFSHash, getIPFSHash, setCurrentElectorate, getElectorateVoted} from "../redux/action"
import {connect} from "react-redux"
import {Button} from 'semantic-ui-react'
import _ from 'lodash'
import imageUrl from './img/2.jpg'

import {Field, reduxForm, SubmissionError} from "redux-form"

class Electorate extends React.Component {

    state = {
        persons: []
    };


    async componentDidMount() {
        console.log("componentDidMount this.state", this.state);
        await this.props.getElectorateVoted();
        await this.props.getIPFSHash();

        if (this.props.ipfs_hash) {
            console.log("componentDidMount.fetchIPFSData this.props.ipfs_hash", this.props.ipfs_hash);
            this.fetchIPFSData(this.props.ipfs_hash);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.ipfs_hash !== prevProps.ipfs_hash) {
            this.fetchIPFSData(this.props.ipfs_hash);
        }
        if (this.props.electorate_voted !== prevProps.electorate_voted) {
            this.updateVoted(this.state.persons, this.props.electorate_voted);
        }

    }

    sortPersonsByAlphabet = (persons)=>{

        console.log("sortPersonsByAlphabet" , persons);
        persons.sort(function(a, b){
            if (a.text < b.text)
                return -1;
            if ( a.text > b.text)
                return 1;
            return 0;
        });
    }

    fetchIPFSData = (ipfs_hash) => {
        ipfs.files.cat(ipfs_hash)
            .then(persons => {
                this.setPersons(persons);
            });

    };

    setPersons = (persons) => {
        const personsOptions = _.map(JSON.parse(persons), person => ({
                key: person.id,
                text: person.name,
                value: person.id,
                password: person.password,
                voted: false
            })
        );
        this.sortPersonsByAlphabet(personsOptions);
        this.updateVoted(personsOptions, this.props.electorate_voted);
    };

    updateVoted = (persons, votedPersons) => {
        if (!votedPersons) {
            return;
        }

        votedPersons.forEach((value) => {
            let electorate = _.find(persons, ['value', value]);

            if (electorate) {
                electorate.voted = true;
            }
        })
        console.log("updateVoted");
        this.setState({persons: persons});
    }
    createIPFSHash = () => {
        ipfs.files.add(Buffer.from(JSON.stringify(json_file)))
            .then(res => {
                const hash = res[0].hash;

                this.props.setIPFSHash(hash);

                return ipfs.files.cat(hash)
            })
            .then(persons => {
                this.setPersons(persons);
                console.log('retrieved data:', JSON.parse(persons))
            })
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
        return (
            <div className={className}>
                <input
                    {...formProps.input}  type={formProps.type}
                />
                {this.renderError(formProps.meta)}
            </div>
        )
    }

    onSubmit = (value) => {

        const electorate = _.find(this.state.persons, ['value', value.electorate]);
        if (!electorate) {
            throw new SubmissionError({
                password: 'choose your name from list',
                _error: 'Login failed!'
            })
        }

        if (electorate.password !== value.password) {

            throw new SubmissionError({
                password: 'Wrong password, try again',
                _error: 'Login failed!'
            })
        }

        this.props.setCurrentElectorate(electorate);
        this.props.history.push("/candidate");
    }

    quote = (imageUrl) => {
        return(
            <div className="quote" style={{backgroundImage: `url(${imageUrl})` }}>
                <blockquote>
                    <h2>
                        Тот, кто будет управлять всеми, должен быть избран среди всех.
                    </h2>
                    <p>
                        - Плиний Младший, римский писатель
                    </p>
                </blockquote>
                <div className="vote">
                    <p>Голосовать</p>
                    <div className="arrow-ico">
                        <i className="arrow circle down icon"></i>
                    </div>
                </div>
            </div>
        )
    }

    render() {

        const {handleSubmit, pristine, reset, submitting} = this.props;

        const {admin, user} = this.props.web3_address;

        const inactive = (admin != null && user === admin) ? "" : "none";

        return (
            <div>
                {this.quote(imageUrl)}
                <div className="padding-100 vote-form">
                    <div className="ui container">
                        <form className={"ui form error"} onSubmit={handleSubmit(this.onSubmit)}>
                            {/*<Select placeholder={"input your name"} onChange={this.handleChange} options={this.state.persons}/>*/}
                            <div className="two fields">
                                <div className="field field-15">
                                    <img src="gerb.png" alt="gerb"/>
                                    <p>
                                        Очередные выборы президента Украины в соответствии с Конституцией Украины назначены Верховной Радой Украины на воскресенье 31 марта 2019 года.
                                    </p>
                                    <p>
                                        Глава государства будет избран путём прямого всеобщего тайного голосования на пятилетний срок.
                                    </p>
                                </div>
                                <div className="field field-15">
                                    <h3>Войдите в систему для голосования</h3>
                                    <div className="form-field">
                                        <label><i className="user icon"></i> Ваше Имя</label>
                                        <Field name="electorate" component="select">
                                            <option> </option>
                                            {this.state.persons.map((person) => {
                                                // const inactive = person.voted;//(person.password === "5");
                                                return (
                                                    <option key={person.key} value={person.value}
                                                            disabled={person.voted}>{person.text}</option>
                                                )
                                            })}
                                        </Field>
                                    </div>
                                    <div className="form-field">
                                        <label><i className="unlock icon"></i> Ваш Пароль</label>
                                        <Field name="password" type="password" component={this.renderField} label={"Password"}/>
                                    </div>
                                    <div className="ui buttons">
                                        <Button primary disabled={submitting}>
                                            Войти
                                        </Button>
                                        <div className="or"></div>
                                        <Button disabled={pristine || submitting} onClick={reset}>
                                            Сбросить
                                        </Button>
                                    </div>
                                </div>

                            </div>

                        </form>

                        <div style={{display: `${inactive}`}}>
                            Администратор может обновить список избирателей
                            <div>
                                <Button primary onClick={this.createIPFSHash}>Обновить Список</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        )
    }
}

const validate = (values) => {
    const errors = {}

    if (!values.password) {
        errors.password = "you must enter a password";
    }

    else if (values.password.length > 2) {
        errors.password = "must be 2 characters or less"
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
    return {
        ipfs_hash: state.ipfs_hash.ipfsHashAv,
        web3_address: state.web3_address,
        electorate_voted: state.electorate_voted.arr

    }
}


export default reduxForm({
    form: "ElectorateForm",
    validate
})(connect(mapStateToProps, {
    setIPFSHash,
    getIPFSHash,
    setCurrentElectorate,
    getElectorateVoted
})(Electorate));