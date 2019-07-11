
const proxy = require("./server/web3Proxy");
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

class QueueManager{
    constructor(){
        this.data = [];
    }

    isBusy(){
        return (queueManager.data.length !== 0);
    }

    push(candidate, electorate){
        queueManager.data.push([candidate, electorate]);
    }

    next(retry){
        let data = null;

        if(!retry){
            console.log("next shift queue " );
            queueManager.data.shift(); //clear first element from queue
        }

        if(queueManager.data.length !== 0){
            data = queueManager.data[0];
        }

        if(data){
            console.log("next res.send", data[0],data[1]);
            return({candidate: data[0], electorate: data[1]});
        }else{
            console.log("next res.send NULL");
            return null;
        }
    }


}

queueManager = new QueueManager();

app.post('/vote', (req, res) => {
    console.log("vote", req.body.candidate, req.body.electorate );

    const {candidate, electorate} = req.body;

    proxy.vote(candidate, electorate, function (result) {

        console.log("vote result" , result );
        res.send(true);
    });

});


app.get('/getIPFSHash', (req, res) => {
    console.log("getIPFSHash" );
    proxy.getIPFSHash(function (data) {
        res.send(data);
    });
});

app.post('/setIPFSHash', (req, res) => {
    console.log("setIPFSHash" );
    proxy.setIPFSHash(req.body.hash, function (data) {
        res.send(data);
    });
});


app.get('/getContractAddress', (req, res) => {
    console.log("getContractAddress" );
    proxy.getContractAddress(function (data) {
        res.send(data);
    });
});

app.get('/getElectorateVoted', (req, res) => {
    console.log("getElectorateVoted" );
    proxy.getElectorateVoted(function (data) {
        res.send(data);
    });
});

app.get('/getCandidates', (req, res) => {
    console.log("getCandidates" );
    proxy.getCandidates(function (data) {
        res.send(data);
    });
});

app.get('/getElectionResult', (req, res) => {
    console.log("getElectionResult" );
    proxy.getElectionResult(function (data) {
        res.send(data);
    });
});

app.listen(port,(err) =>{
    if(err)  throw err;
    console.log(`Ready on localhost:${port}`);
});