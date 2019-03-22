import React, {Component} from 'react';
import {Container} from 'semantic-ui-react'
import Graph from "./ChartBar/Graph"

const data = [
    {text: "Man", value: 30},
    {text: "Woman", value: 15}
];

const margin = {top: 10, right: 0, bottom: 20, left: 50};


class Admin extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Graph/>
            </div>
        )
    }
}

export default Admin;