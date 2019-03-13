import types from "./types"
import {combineReducers} from "redux"


const ipfsHashReducer = (state = "", action) => {
    if(types.ipfs_hash === action.type){
        return { ...state, ipfs_hash: action.payload}
    }
    return state;
}

export default  combineReducers({
    ipfs_hash: ipfsHashReducer
})

