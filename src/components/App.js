import React, {Component} from 'react';
import Electorate from "./Electorate"
import Candidate from "./Candidate"
import Thanks from "./Thanks"

import {Router, Route, Switch} from "react-router-dom"
import {getContractAddress} from "../redux/action";
import {connect} from "react-redux";


import history from "../history"


class App extends Component {


     componentWillMount() {
         this.props.getContractAddress();
    }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route path={"/"} exact component={(props) => <Electorate {...props} /> } />
                        <Route path={"/candidate"} exact component={(props) => <Candidate{...props}/> } />
                        <Route path={"/thanks"} exact component={Thanks}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default  connect(null, {getContractAddress })(App);
