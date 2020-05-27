const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult  } = require('express-validator');

const hostname = '127.0.0.1';
const port = 5000;

const gol = require("./main");

let app = express();

app.use( bodyParser.json() );

app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})


app.post("/gameoflife/next",[
    body().custom( value =>{    
    if (!Array.isArray(value) || !Array.isArray(value[0])){
        throw new Error('Body must only contain a 2-dimensional array!');
    }
    const firstRowLength = value[0].length;
    value.forEach(arr => {
        if (!Array.isArray(arr)){
            throw new Error('Body must only contain a 2-dimensional array!');
        }else if (arr.length !== firstRowLength){
            throw new Error('The rows must have the same length!');
        }
        arr.forEach(element => {
            if (element !==0 && element !==1){
                throw new Error('Only 0s and 1s are permitted!');;
            }
        });
    });
    return true;
})],
(req, res) =>{
    const result = validationResult(req);
    if (!result.isEmpty()){        
        return res.status(400).json(result.array());
    }
    let oldgen= req.body;
    let nextgen = gol.getNextGeneration(oldgen);
    return res.json(nextgen);
} )

app.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})