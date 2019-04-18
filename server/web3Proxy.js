
const smartContractData = require("./../src/ethereum/contractInstance");

console.log("contractInstance", smartContractData);

exports.getIPFSHash = (callback) => {
    smartContractData.then(obj => {
            obj.instanceSM.methods.getIPFS().call().then((result) => {
                console.log("getIPFSHash:result ", result);
                callback(result);
            }).catch((err) => {
                console.log("getIPFSHash:err ", err.message);
            });
        }
    )
}
exports.setIPFSHash = (hash, callback) => {
    smartContractData.then(obj => {
            obj.instanceSM.methods.setIPFS(hash).send({
                from: obj.accounts[0],
                gas: "2000000"
            }).then((result) => {
                console.log("setIPFSHash:result ", result.events.OnIPFSHash.returnValues.hash);
                callback(result.events.OnIPFSHash.returnValues.hash);
            }).catch((err) => {
                console.log("setIPFSHash:err ", err.message);
            });
        }
    )
}
exports.getContractAddress = (callback) => {
    smartContractData.then(obj => {
            obj.instanceSM.methods.admin().call().then((result) => {
                    console.log("admin:result ", result);
                    callback(result);
                })
            }).catch((err) => {
                console.log("admin:err ", err.message);
            });
}


exports.getElectorateVoted = (callback) =>  {
    console.log("getElectorateVoted");

    smartContractData.then(obj => {
        obj.instanceSM.methods.getNumberOfVoter().call().then((length) => {
            console.log("getElectorateVoted:length ", length);
            const requestPromises = [];
            for (let i = 0; i < length; ++i) {
                requestPromises.push(obj.instanceSM.methods.votersArray(i).call());
            }
            Promise.all(requestPromises).then(votes => {
                console.log("getElectorateVoted:votes ", votes);
                callback(votes);
            })
        })
    }).catch((err) => {
        console.log("getElectorateVoted:err ", err.message);
    });
}


exports.vote = (candidate, electorate, callback) => {
    console.log("vote");
    smartContractData.then(obj => {
        obj.instanceSM.methods.vote(candidate, electorate).send({
            from: obj.accounts[0],
            gas: "2000000"
        }).then((result) => {
            console.log("vote:result ", result.events.OnVote.returnValues);
            callback(true);
        }).catch((err) => {
            reject(err);
            callback(false);
        });
    });
}

exports.getCandidates = (callback) => {
    console.log("getCandidates");

    smartContractData.then(obj => {
        obj.instanceSM.methods.getNumberOfContender().call().then((length) => {
            console.log("getCandidates:length ", length);
            const requestPromises = [];
            for (let i = 0; i < length; ++i) {
                requestPromises.push(obj.instanceSM.methods.contender(i).call());
            }

            Promise.all(requestPromises).then(candidates => {

                console.log("getCandidates:candidates ", candidates);
                candidates.sort(function (a, b) {
                    if (a.fullName === 'Против всех') return 0;
                    if (b.fullName === 'Против всех') return 0;

                    if (a.fullName < b.fullName)
                        return -1;
                    if (a.fullName > b.fullName)
                        return 1;
                    return 0;
                });
                console.log("getCandidates:result after sort by alphabet ", candidates);
                callback(candidates);
            })
        })
    }).catch((err) => {
        console.log("getCandidates:err ", err.message);
    });
}

exports.getElectionResult = (callback) => {

    smartContractData.then(obj => {
        obj.instanceSM.methods.getNumberOfContender().call().then((length) => {
            console.log("getElectionResult:length ", length);
            const requestPromises = [];
            for (let i = 0; i < length; ++i) {
                requestPromises.push(obj.instanceSM.methods.contender(i).call());
            }

            Promise.all(requestPromises).then(electionResult => {

                console.log("getElectionResult:candidates ", electionResult);
                electionResult.sort(function (a, b) {
                    return b.voteCounter - a.voteCounter
                });
                console.log("getElectionResult:result after sort by alphabet ", electionResult);
                callback(electionResult);
            })
        })
    }).catch((err) => {
        console.log("getElectionResult:err ", err.message);
    });
}