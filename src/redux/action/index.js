import types from "../reducer/types"
import {smartContractData} from "../../ethereum/contractInstance"
import web3 from "../../ethereum/web3"

export const setIPFSHash = (hash) => (dispatch) => {
    console.log("setIPFSHash");

    smartContractData.then( obj =>
        {
            obj.instanceSM.methods.setIPFS(hash).send({
                from: obj.accounts[0],
                gas: "2000000"
            }).then((result) => {
                console.log("setIPFSHash:result ", result.events.OnIPFSHash.returnValues.hash);
                dispatch({type: types.IPFS_HASH, payload: result.events.OnIPFSHash.returnValues.hash})
            }).catch( (err)   => {
                console.log("setIPFSHash:err ", err.message);
            });
        }
    )
}

export const getIPFSHash = () => (dispatch) => {
    console.log("getIPFSHash");

    smartContractData.then( obj =>
        {
            obj.instanceSM.methods.getIPFS().call().then((result) => {
                console.log("getIPFSHash:result ", result);
                dispatch({type: types.IPFS_HASH, payload: result})
            }).catch( (err)   => {
                console.log("getIPFSHash:err ", err.message);
            });
        }
    )
}

export const setCurrentElectorate = (person) => {

    return {type: types.CURRENT_ELECTORATE, payload: person};
}