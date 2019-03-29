import types from "./types"
import {combineReducers} from "redux"
import {reducer as formReducer} from 'redux-form'

const INITIAL_STATE = {
    ipfsHashAv: null
}

const initialArrayState = {

    arr: []
}

const ipfsHashReducer = (state = INITIAL_STATE, action) => {
    if (types.IPFS_HASH === action.type) {
        return {...state, ipfsHashAv: action.payload}
    }
    return state;
}

const currentElectorateReducer = (state = {}, action) => {

    if (types.SET_CURRENT_ELECTORATE === action.type) {
        return action.payload;
    }

    if(types.GET_CURRENT_ELECTORATE === action.type){
        return state;
    }
    return state;
}


const setVoteProcessReducer = (state = false, action) => {
    if (types.SET_VOTE_PROCESS === action.type) {
        return  action.payload
    }
    return state;
}


const adminAddressReducer = (state = {}, action) => {

    if (types.WEB3_ADDRESS === action.type) {
        return action.payload;
    }
    return state;
}

const electorateVotedReducer = (state = [], action) => {
    if (types.UPDATE_VOTED_LIST === action.type) {

        return {
            arr: (action.payload)
        }
    }
    return state;
}

const candidateListReducer = (state = initialArrayState, action) => {
    if (types.UPDATE_CANDIDATE_LIST === action.type) {

        return {
            arr: (action.payload)
        }

    }
    return state;
}


const candidateListResultReducer = (state = initialArrayState, action) => {
    if (types.UPDATE_CANDIDATE_LIST_RESULT === action.type) {

        return {
            arr: (action.payload)
        }

    }
    return state;
}


export default combineReducers({
    form: formReducer,
    ipfs_hash: ipfsHashReducer,
    current_voter: currentElectorateReducer,
    is_vote_processed: setVoteProcessReducer,
    web3_address: adminAddressReducer,
    electorate_voted: electorateVotedReducer,
    candidates: candidateListReducer,
    candidates_result:  candidateListResultReducer
})

