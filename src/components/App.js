import React, {Component} from 'react';
// import Electorate from "./Electorate"
// import Candidate from "./Candidate"
// import Thanks from "./Thanks"
// import Result from "./Result"

import {Router, Route, Switch} from "react-router-dom"
import {getIPFSHash, getElectionResult, vote} from "../redux/action";
import {connect} from "react-redux";

import history from "../history"
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from 'react-router-scroll-top'


class App extends Component {


    componentWillMount() {
        this.props.vote("Зеленский В.А.", "Sergey12");
       // this.props.getIPFSHash();
        //this.props.getElectionResult();
        //this.props.getContractAddress();
    }

    render() {
        return (
            <div className="main">
                {/*<div className="content">*/}
                    {/*<Header/>*/}
                    {/*<Router onUpdate={() => window.scrollTo(0, 0)} history={history}>*/}
                        {/*<ScrollToTop>*/}
                            {/*<Switch>*/}
                                {/*<Route path={"/"} exact component={(props) => <Electorate {...props} />}/>*/}
                                {/*<Route path={"/candidate"} exact component={(props) => <Candidate{...props}/>}/>*/}
                                {/*<Route path={"/thanks"} exact component={Thanks}/>*/}
                                {/*<Route path={"/result"} exact component={Result}/>*/}
                            {/*</Switch>*/}
                        {/*</ScrollToTop>*/}
                    {/*</Router>*/}
                {/*</div>*/}
                {/*<Footer/>*/}
            </div>
        );
    }
}


export default connect(null, {getIPFSHash, getElectionResult, vote})(App);
