import types from "../reducer/types"
import axios from "axios";

export const setIPFSHash = (hash) => (dispatch) => {
    console.log("setIPFSHash");


    axios.post("/setIPFSHash", {hash}).then( response => {
        console.log("setIPFSHash:result ", response.data);
        dispatch({type: types.IPFS_HASH, payload: response.data})
    }).catch(err => {
        console.log("setIPFSHash:err ", err);
    })
}

export const getIPFSHash = () => (dispatch) => {
    console.log("getIPFSHash");

    axios.get("/getIPFSHash").then( response => {
        console.log("getIPFSHash:result ", response.data);
        dispatch({type: types.IPFS_HASH, payload: response.data})
    }).catch(err => {
        console.log("getIPFSHash:err ", err);
    })
}

export const setCurrentElectorate = (person) => {

    return {type: types.SET_CURRENT_ELECTORATE, payload: person};
}

export const getCurrentElectorate = () => {

    return {type: types.GET_CURRENT_ELECTORATE};
}

export const getContractAddress = () => (dispatch) => {
    console.log("getContractAddress");


    axios.get("/getContractAddress").then( response => {
        console.log("getContractAddress:result ", response.data);
        dispatch({
            type: types.WEB3_ADDRESS, payload: {
                admin: response.data.admin,
                 user: response.data.user
            }
        })
    }).catch(err => {
        console.log("getContractAddress:err ", err);
    })
}

export const getElectorateVoted = () => async (dispatch) => {
    console.log("getElectorateVoted");

    axios.get("/getElectorateVoted").then( response => {
        console.log("getElectorateVoted:result ", response.data);
        dispatch({type: types.UPDATE_VOTED_LIST, payload: response.data})
    }).catch(err => {
        console.log("getElectorateVoted:err ", err);
    })
}


export const vote = (candidate, electorate, onStartVoting) => (dispatch) => {
    console.log("vote");

    dispatch({type: types.SET_VOTE_PROCESS, payload: false})

    axios.post("/vote", {candidate, electorate }).then( response => {
        console.log("vote:result ", response.data);
        dispatch({type: types.SET_VOTE_PROCESS, payload: true})
    }).catch(err => {
        console.log("vote:err ", err);
    })
}

export const getCandidates = () => async (dispatch) => {
    axios.get("/getCandidates").then( response => {
        console.log("getCandidates:result ", response.data);
        dispatch({type: types.UPDATE_CANDIDATE_LIST, payload: response.data})
    }).catch(err => {
        console.log("getCandidates:err ", err);
    })
}

export const getElectionResult = () => async (dispatch) => {

    axios.get("/getElectionResult").then( response => {
        console.log("getElectionResult:result ", response.data);
        dispatch({type: types.UPDATE_CANDIDATE_LIST_RESULT, payload: response.data})
    }).catch(err => {
        console.log("getElectionResult:err ", err);
    })
}