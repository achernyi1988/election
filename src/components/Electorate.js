import React from "react"
import ipfs from "../ethereum/api/ipfs_client"
import json from '../electorate/electorate.json';

class Electorate extends React.Component {

    state = {
        ipfs_hash: "",
        persons: []
    }

    async componentDidMount() {

        console.log(json);

        ipfs.files.add(Buffer.from(JSON.stringify(json)))
            .then(res => {
                const hash = res[0].hash;
                this.setState({ipfs_hash: hash});
                console.log('added data hash:', hash)
                return ipfs.files.cat(hash)
            })
            .then(output => {
                this.setState({persons: JSON.parse(output)});
                console.log('retrieved data:', JSON.parse(output))
            })

    }

    render() {
        return (
            <div>
                Electorate
                {this.state.persons.map((person) => {
                    return (
                        <div key={person.id}>
                            <ul>{person.name}</ul>
                        </div>
                    )
                })}
                {this.state.ipfs_hash}
            </div>
        )
    }
}

export default Electorate;