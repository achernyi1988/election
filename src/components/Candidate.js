import React from "react"
import {smartContractData} from "../ethereum/contractInstance"

class Candidate extends React.Component {


    componentDidMount() {
        console.log("componentDidMount");
    }


    vote = () => {

        smartContractData.then(obj => {
            obj.instanceSM.methods.vote("Alex")
                .send({
                    from: obj.accounts[0],
                    gas: "2000000"
                }).then((value) => {
                console.log("value = ", value);
            }).catch((err) => {
                console.log("err = ", err);
            })
        })
    }
    getNoOfVotes = async () => {

        smartContractData.then(async obj => {
            console.log("obj ", obj);
            const result = await obj.instanceSM.methods.getNoOfVoted("Alex").call();

            console.log("result = ", result)
        })


    }

    render() {
        return (
            <div>
                Candidate
                <button onClick={this.vote}> Vote </button>
                <button onClick={this.getNoOfVotes}> Get numbers</button>
            </div>
        )
    }
}

export default Candidate;