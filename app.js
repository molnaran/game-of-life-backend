const express = require('express');
const bodyParser = require('body-parser');

const golRoute = require('./routes/gol-route').router;

const hostname = '127.0.0.1';
const port = 5000;

let app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/gameoflife/", golRoute);

app.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})