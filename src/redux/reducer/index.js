import types from "./types"
import {combineReducers} from "redux"
import { reducer as formReducer } from 'redux-form'

const INITIAL_STATE = {
    ipfsHashAv: null
}

const ipfsHashReducer = (state = INITIAL_STATE, action) => {
    if(types.IPFS_HASH === action.type){
        return { ...state, ipfsHashAv: action.payload}
    }
    return state;
}

const currentElectorateReducer = (state = {}, action) => {
    if(types.CURRENT_ELECTORATE === action.type){
        return  action.payload;
    }
    return state;
}

const adminAddressReducer = (state = {}, action) => {

    if(types.WEB3_ADDRESS === action.type){
        return  action.payload;
    }
    return state;
}

const electorateVotedReducer = (state = [], action) => {
    if(types.UPDATE_VOTED_LIST === action.type){

        return{

            ...state,
            arr: state.concat(action.payload)
        }
    }
    return state;
}

const candidateListReducer = (state = [], action) => {
    if(types.UPDATE_CANDIDATE_LIST === action.type){

        return{

            ...state,
            arr: state.concat(action.payload)
        }
    }
    return state;
}


export default  combineReducers({
    form: formReducer,
    ipfs_hash: ipfsHashReducer,
    current_electorate: currentElectorateReducer,
    web3_address: adminAddressReducer,
    electorate_voted: electorateVotedReducer,
    candidates:candidateListReducer
})

