import web3 from "../ethereum/web3"
const compiledFactory = require("../ethereum/build/Election");

// PRIVATE_KEY = "109D58463D2A21022382C21C9A4FA0CDDAA6E20B4FDF9CFD2304E182DCC56CBE";
const CONTRACT_ADDRESS = "0xfBF6e0Ff3F33F958fa71Ed25F5a2C9F207Cdf5a7";  //rinkby
//const CONTRACT_ADDRESS = "0x5fa4FbcE6b2896FaF6d2157853d5501441a969e5";    //ganache


const createInstance = async() => {

    let accounts = await web3.eth.getAccounts();
    let instanceSM =  await new web3.eth.Contract(JSON.parse(compiledFactory.interface), CONTRACT_ADDRESS);

    return {instanceSM, accounts }

}

export const smartContractData =  createInstance().then( contractObj => {
    console.log("contractObj", contractObj);
    return contractObj;
    }
).catch(err => {
    console.log("instanceSM", err.message);
})
    // const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
    // console.log(account);
    // web3.eth.accounts.wallet.add(account);
    // console.log("before", web3.eth.defaultAccount);
    // web3.eth.defaultAccount = account.address;
    // console.log("after", web3.eth.defaultAccount);

    // let accounts = await web3.eth.getAccounts();
    // console.log(accounts);


    // console.log("contract", smartContract);
    //
    // instanceSM =  new smartContract;
    //
    // console.log("instanceSM", smartContract);






