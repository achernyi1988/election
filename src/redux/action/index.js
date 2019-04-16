import types from "../reducer/types"
import {smartContractData} from "../../ethereum/contractInstance"
import timer from "../../utils/timer"
import axios from "axios/index";
var promiseRetry = require('promise-retry');


export const setIPFSHash = (hash) => (dispatch) => {
    console.log("setIPFSHash");

    smartContractData.then(obj => {
            obj.instanceSM.methods.setIPFS(hash).send({
                from: obj.accounts[0],
                gas: "2000000"
            }).then((result) => {
                console.log("setIPFSHash:result ", result.events.OnIPFSHash.returnValues.hash);
                dispatch({type: types.IPFS_HASH, payload: result.events.OnIPFSHash.returnValues.hash})
            }).catch((err) => {
                console.log("setIPFSHash:err ", err.message);
            });
        }
    )
}

export const getIPFSHash = () => (dispatch) => {
    console.log("getIPFSHash");

    smartContractData.then(obj => {
            obj.instanceSM.methods.getIPFS().call().then((result) => {
                console.log("getIPFSHash:result ", result);
                dispatch({type: types.IPFS_HASH, payload: result.length === 0 ? null : result})
            }).catch((err) => {
                console.log("getIPFSHash:err ", err.message);
            });
        }
    )
}

export const setCurrentElectorate = (person) => {

    return {type: types.SET_CURRENT_ELECTORATE, payload: person};
}

export const getCurrentElectorate = () => {

    return {type: types.GET_CURRENT_ELECTORATE};
}

export const getContractAddress = () => (dispatch) => {
    console.log("getContractAddess");

    smartContractData.then(obj => {
            obj.instanceSM.methods.admin().call().then((result) => {
                console.log("admin:result ", result);
                dispatch({
                    type: types.WEB3_ADDRESS, payload: {
                        admin: result.length === 0 ? null : result,
                        user: obj.accounts[0]
                    }
                })
            }).catch((err) => {
                console.log("admin:err ", err.message);
            });
        }
    )
}

export const getElectorateVoted = () => async (dispatch) => {
    console.log("getElectorateVoted");

    const {instanceSM} = await smartContractData.then();// obj =>

    const length = await instanceSM.methods.getNumberOfVoter().call();

    let arr = [];
    for (let i = 0; i < length; ++i) {
        const {voter} = await instanceSM.methods.votersArray(i).call()
        arr.push(voter);
    }
    console.log("getElectorateVoted:result ", arr);
    dispatch({type: types.UPDATE_VOTED_LIST, payload: arr})

}


function send_vote_retry(candidate, electorate, dispatch, n) {
    return sendVote(candidate, electorate, dispatch).catch(function(error) {
        if (n === 0) throw error;
        return sendVote(candidate, electorate, dispatch,  n - 1);
    });
}


function sendVote(candidate, electorate, dispatch, onFinishedVoting) {

    smartContractData.then(obj => {
        obj.instanceSM.methods.vote(candidate, electorate).send({
            from: obj.accounts[0],
            gas: "2000000"
        }).then((result) => {
            console.log("vote:result ", result.events.OnVote.returnValues);
            dispatch({type: types.SET_VOTE_PROCESS, payload: true})
            onFinishedVoting(false); // no retry
        }).catch((err) => {
            console.log("vote:err ", err);
            onFinishedVoting(true); //retry
        });
    });

}


export const vote = (candidate, electorate, onStartVoting, onFinishedVoting) => async (dispatch) => {
    console.log("vote:");

    dispatch({type: types.SET_VOTE_PROCESS, payload: false});

    onStartVoting();

    sendVote(candidate, electorate, dispatch, onFinishedVoting );

}

export const getCandidates = () => async (dispatch) => {
    console.log("getCandidates");

    const {instanceSM} = await smartContractData.then();// obj =>
    const length = await instanceSM.methods.getNumberOfContender().call();

    let arr = [];
    for (let i = 0; i < length; ++i) {
        arr.push(await instanceSM.methods.contender(i).call());
    }
    arr.sort(function (a, b) {
        if (a.fullName === 'Против всех') return 0;
        if (b.fullName === 'Против всех') return 0;

        if (a.fullName < b.fullName)
            return -1;
        if (a.fullName > b.fullName)
            return 1;
        return 0;
    });

    console.log("getCandidates:result after sort by alphabet ", arr);
    dispatch({type: types.UPDATE_CANDIDATE_LIST, payload: arr})

}

export const getElectionResult = () => async (dispatch) => {
    const {instanceSM} = await smartContractData.then();// obj =>
    const length = await instanceSM.methods.getNumberOfContender().call();

    let arr = [];
    for (let i = 0; i < length; ++i) {
        arr.push(await instanceSM.methods.contender(i).call());
    }
    arr.sort(function (a, b) {
        return b.voteCounter - a.voteCounter
    });
    console.log("getCandidates:result after sort ", arr);
    dispatch({type: types.UPDATE_CANDIDATE_LIST_RESULT, payload: arr})

}