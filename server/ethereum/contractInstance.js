const web3 = require ("../ethereum/web3")
const compiledFactory = require("../ethereum/build/Election");

// PRIVATE_KEY = "109D58463D2A21022382C21C9A4FA0CDDAA6E20B4FDF9CFD2304E182DCC56CBE";
const CONTRACT_ADDRESS = "0xd50a43cCC1bF464fC8a81Be57D77DC870caACaFF";  //rinkby
//const CONTRACT_ADDRESS = "0x98fa87260D5D071c4b0243b4232883aF7470B019";    //ganache


const createInstance = async() => {


    let accounts = await web3.eth.getAccounts();

    let instanceSM =  await new web3.eth.Contract(JSON.parse(compiledFactory.interface), CONTRACT_ADDRESS);

    return {instanceSM, accounts }

}

 const smartContractData =  createInstance().then( contractObj => {

    return contractObj;
    }
).catch(err => {
    console.log("instanceSM", err.message);
})

module.exports = smartContractData;
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






