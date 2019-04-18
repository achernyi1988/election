
const proxy = require("./server/web3Proxy");
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'build')));
//
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

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

app.post('/vote', (req, res) => {
    console.log("vote", req.body.candidate, req.body.electorate );
    proxy.vote(req.body.candidate, req.body.electorate, function (data) {
        res.send(data);
    });
});

app.listen(port,(err) =>{
    if(err)  throw err;
    console.log(`Ready on localhost:${port}`);
});