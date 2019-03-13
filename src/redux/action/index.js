import types from "../reducer/types"
import {smartContractData} from "../ethereum/contractInstance"

export const setIPFSHash = (hash) => async (dispatch) => {
    console.log("setIPFSHash");
    await  contractInstance.methods.setIPFS(hash).call().then({
       // from: this.accounts[0],
        gas: "2000000"
    }).then((value) => {
        console.log("setIPFSHash:contractInstance ", value);
    }).catch( (err)   => {
        console.log("setIPFSHash:err ", err.message);
    });


    dispatch({type: types.ipfs_hash})
}