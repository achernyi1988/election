const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'build')));


class QueueManager{
    constructor(){
        this.data = [];
    }

}

queueManager = new QueueManager();

app.post('/queue_push', (req, res) => {
    console.log("queue_push" );

    queueManager.data.push([req.body.candidate, req.body.electorate]);

    console.log("queue_push", queueManager.data);
    res.send(true);
});


app.get('/queue_isBusy', (req, res) => {
    console.log("queue_isBusy" );


    console.log("queue_isBusy", queueManager.data.length !== 0);

    res.send(queueManager.data.length !== 0);

});

app.get('/queue_next', (req, res) => {
    console.log("queue_next req.query.retry ", req.query.retry );
    let data = null;

    if("false" === req.query.retry){
        console.log("queue_next shift queue ", req.query.retry );
        queueManager.data.shift(); //clear first element from queue
    }

    if(queueManager.data.length !== 0){
        data = queueManager.data[0];
    }

    if(data){
        console.log("queue_next res.send", data[0],data[1]);
        res.send({candidate: data[0], electorate: data[1]});
    }else{
        console.log("queue_next res.send NULL");
        res.send({candidate: null, electorate: null});
    }



});

app.get('/*', (req, res) => {
    console.log("/*");
    res.sendFile(path.join(__dirname+'/public/index.html'));
})


app.listen(port, () => console.log(`Listening on port ${port}`));