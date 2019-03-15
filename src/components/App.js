import React, {Component} from 'react';
import Electorate from "./Electorate"
import Candidate from "./Candidate"
import Thanks from "./Thanks"

import {BrowserRouter, Route, Switch} from "react-router-dom"





class App extends Component {

     componentDidMount() {



    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path={"/"} exact component={(props) => <Electorate {...props} /> } />
                        <Route path={"/candidate"} exact component={Candidate}/>
                        <Route path={"/thanks"} exact component={Thanks}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
