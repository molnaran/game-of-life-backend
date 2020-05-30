const { validationResult } = require('express-validator');

function countNeighbours(row, column, grid){
    let numOfNeighbours=0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            const rowIndex = row + i;
            const colIndex = column + j;
            if (rowIndex==row && colIndex==column){                
                continue;
            }

            const columnSize = grid[row].length;            
            const rowSize = grid.length;
            if (rowIndex>-1 && rowIndex<rowSize && colIndex>-1 && colIndex<columnSize){
                numOfNeighbours+= grid[rowIndex][colIndex];
            } 
        }        
    }
    return numOfNeighbours;
}

function getNextGeneration(grid){
    const ALIVECELL = 1;
    const DEADCELL = 0;

    const nextGen = grid.map(function(arr) {
        return arr.slice();
    });

    const columnSize = grid[0].length;            
    const rowSize = grid.length;  
    
    for(let i = 0; i < rowSize; i++) {
        for(let j = 0; j < columnSize; j++) {
            const numOfNeighbours = countNeighbours(i, j, grid);
            const UNDERPOPULATION = grid[i][j] === ALIVECELL && numOfNeighbours < 2;
            const STAGNATE = grid[i][j] === ALIVECELL && (numOfNeighbours===2 || numOfNeighbours===3);
            const OVERPOPULATION = grid[i][j] === ALIVECELL && numOfNeighbours >3;
            const BIRTH = grid[i][j] === DEADCELL && numOfNeighbours === 3;

            if (UNDERPOPULATION){
                nextGen[i][j] = DEADCELL;
            }else if (OVERPOPULATION){
                nextGen[i][j] = DEADCELL;
            }else if (BIRTH){
                nextGen[i][j] = ALIVECELL;
            }
        }
    }
    return nextGen;
}

nextgen = (req, res) =>{
    const result = validationResult(req);
    if (!result.isEmpty()){        
        return res.status(400).json(result.array());
    }
    let oldgen= req.body;
    let nextgen = getNextGeneration(oldgen);
    return res.json(nextgen);
}

module.exports = {countNeighbours, getNextGeneration, nextgen}