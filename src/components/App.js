import React, {Component} from 'react';
import Electorate from "./Electorate"
import Candidate from "./Candidate"
import Thanks from "./Thanks"

import {BrowserRouter, Route, Switch} from "react-router-dom"





class App extends Component {

    async componentDidMount() {



    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact component={Electorate}/>
                        <Route path={"/candidate"} exact component={Candidate}/>
                        <Route path={"/thanks"} exact component={Thanks}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
