import web3 from "../ethereum/web3"
const compiledFactory = require("../ethereum/build/Election");

// PRIVATE_KEY = "109D58463D2A21022382C21C9A4FA0CDDAA6E20B4FDF9CFD2304E182DCC56CBE";
//const CONTRACT_ADDRESS = "0x4d044220b1F3963cbf64a93D6d74114292D6d987";  //rinkby
const CONTRACT_ADDRESS = "0xC8E920B19957fcAA03eD5939E5904426f81B44C5";    //ganache

const createInstance = async () => {

    // const account = web3.eth.accounts.privateKeyToAccount('0x' + PRIVATE_KEY);
    // console.log(account);
    // web3.eth.accounts.wallet.add(account);
    // console.log("before", web3.eth.defaultAccount);
    // web3.eth.defaultAccount = account.address;
    // console.log("after", web3.eth.defaultAccount);
    let accounts = await web3.eth.getAccounts();
    console.log(accounts);

    let smartContract = await new web3.eth.Contract(JSON.parse(compiledFactory.interface), CONTRACT_ADDRESS);

    console.log("contract", smartContract);

    return {smartContract, accounts};

}

export default createInstance;

