import React, {Component} from 'react';
import Electorate from "./Electorate"
import Candidate from "./Candidate"
import Thanks from "./Thanks"

import {BrowserRouter, Route, Switch} from "react-router-dom"
import {getContractAddress} from "../redux/action";
import {connect} from "react-redux";



class App extends Component {


     componentWillMount() {
         this.props.getContractAddress();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact component={(props) => <Electorate {...props} /> } />
                        <Route path={"/candidate"} exact component={(props) => <Candidate{...props}/> } />
                        <Route path={"/thanks"} exact component={Thanks}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default  connect(null, {getContractAddress })(App);
