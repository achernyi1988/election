import types from "../reducer/types"
import {smartContractData} from "../../ethereum/contractInstance"
import history from "../../history"
import sleep from "../../utils/sleep"

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
                dispatch({type: types.IPFS_HASH, payload: result.length === 0 ? null : result})
            }).catch( (err)   => {
                console.log("getIPFSHash:err ", err.message);
            });
        }
    )
}

export const setCurrentElectorate = (person) => {

    return {type: types.CURRENT_ELECTORATE, payload: person};
}

export const getContractAddress = () => (dispatch) => {
    console.log("getContractAddess");

    smartContractData.then( obj =>
        {
            obj.instanceSM.methods.admin().call().then((result) => {
                console.log("admin:result ", result);
                dispatch({type: types.WEB3_ADDRESS, payload: {
                    admin: result.length === 0 ? null : result,
                    user: obj.accounts[0]}})
            }).catch( (err)   => {
                console.log("admin:err ", err.message);
            });
        }
    )
}

export const getElectorateVoted = () => async (dispatch) => {
    console.log("getElectorateVoted");

    const {instanceSM} = await smartContractData.then( );// obj =>

    const length =  await instanceSM.methods.getNumberOfVoter().call();

    let arr = [];
    for(let i = 0; i < length; ++i){
        arr.push(await instanceSM.methods.votersArray(i).call());
    }
    console.log("getElectorateVoted:result ", arr);
    dispatch({type: types.UPDATE_VOTED_LIST, payload: arr})

}


export const vote = (candidate, electorate, onVote ) =>  (dispatch) => {
    console.log("vote");

    smartContractData.then( async obj =>
        {
            onVote();
           // await sleep(15000)
            obj.instanceSM.methods.vote(candidate, electorate).send({
                from: obj.accounts[0],
                gas: "2000000"
            }).then((result) => {
                console.log("vote:result ", result.events.OnVote.returnValues);
                dispatch({type: types.CURRENT_CANDIDATE, payload: result.events.OnVote.returnValues.contender})

                history.push("/thanks");
            }).catch( (err)   => {
                console.log("vote:err ", err.message);
            });
        }
    )
}

export const getCandidates = () => async (dispatch) => {
    console.log("getCandidates");

    const {instanceSM} = await smartContractData.then( );// obj =>
    const length =  await instanceSM.methods.getNumberOfContender().call();

    let arr = [];
    for(let i = 0; i < length; ++i){
        arr.push(await instanceSM.methods.contender(i).call());
    }
    console.log("getCandidates:result ", arr);
    dispatch({type: types.UPDATE_CANDIDATE_LIST, payload: arr})

}