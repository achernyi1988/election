const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let count = 0;

app.use(express.static(path.join(__dirname, 'build')));


app.get('/get_count', (req, res) => {
    console.log("get_count", count++);
    res.json(count);
});

app.get('/*', (req, res) => {
    console.log("/*", count++);
    res.sendFile(path.join(__dirname+'/public/index.html'));
})


app.listen(port, () => console.log(`Listening on port ${port}`));