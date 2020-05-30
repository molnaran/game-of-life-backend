const express = require('express'); 
const router = express.Router(); 
const { body } = require('express-validator');

const golController = require("../controllers/gol-controller");

const validateGOLInput = (input) => {    
    if (!Array.isArray(input) || !Array.isArray(input[0])){
        throw new Error('Body must only contain a 2-dimensional array!');
    }
    const firstRowLength = input[0].length;
    input.forEach(arr => {
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
}

router.post("/next",[body().custom( input => validateGOLInput(input))], golController.nextgen);

module.exports = {router, validateGOLInput};