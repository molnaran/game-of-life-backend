const { countNeighbours, getNextGeneration } = require("../controllers/gol-controller");

describe('countNeighbours tests', () => {
    test('should count neighbours', ()=> {
        const grid = [[1,1,1],
                      [0,1,0],
                      [0,1,0]]; 
        const result = countNeighbours(1,1, grid);
        expect(result).toBe(4);
    });
    
    test('should count neighbours at the top-left edge', ()=> {
        const grid = [[1,1,0],
                      [1,1,0],
                      [0,0,0]]; 
        const result = countNeighbours(0,0, grid);    
        expect(result).toBe(3);
    });
    
    test('should count neighbours at the bottom-left edge', () => {
        const grid = [[0,0,0],
                      [1,1,0],
                      [1,1,0]];
        const result = countNeighbours(2,0, grid);    
        expect(result).toBe(3);
    });
    
    test('should count neighbours at the bottom-right edge', () => {
        const grid = [[0,0,0],
                      [0,1,1],
                      [0,1,1]];
        const result = countNeighbours(2,2, grid);    
        expect(result).toBe(3);
    });
    
    test('should count neighbours at the top-right edge', () => {
        const grid = [[0,1,1],
                      [0,1,1],
                      [0,0,0]];
        const result = countNeighbours(0,2, grid);    
        expect(result).toBe(3);
    });
});

describe('getNextGeneration still life tests', () => {
    test('block should stay the same', ()=> {
        const block = [[0,1,1],
                       [0,1,1],
                       [0,0,0]]; 
        const resultGrid = getNextGeneration(block);
        resultGrid.map((arr, i) => {
            arr.map((el, j)=> {
                expect(resultGrid[i][j]).toBe(block[i][j]);
            })
        })        
    });

    test('beehive should stay the same', ()=> {
        const beehive = [[0,1,1,0],
                         [1,0,0,1],
                         [0,1,1,0]]; 
        const resultGrid = getNextGeneration(beehive);
        resultGrid.map((arr, i) => {
            arr.map((el, j)=> {
                expect(resultGrid[i][j]).toBe(beehive[i][j]);
            })
        })        
    });

    test('loaf should stay the same', ()=> {
        const loaf =  [[0,1,1,0],
                       [1,0,0,1],
                       [0,1,0,1],
                       [0,0,1,0]];
        const resultGrid = getNextGeneration(loaf);
        resultGrid.map((arr, i) => {
            arr.map((el, j)=> {
                expect(resultGrid[i][j]).toBe(loaf[i][j]);
            })
        })        
    });

    test('tub should stay the same', ()=> {
        const tub =  [[0,1,0],
                      [1,0,1],
                      [0,1,0]]; 
        const resultGrid = getNextGeneration(tub);
        resultGrid.map((arr, i) => {
            arr.map((el, j)=> {
                expect(resultGrid[i][j]).toBe(tub[i][j]);
            })
        })        
    });
});

describe('getNextGeneration oscillators tests', () => {
    test('blinker should return to itself after 2 periods', ()=> {
        const blinker =  [[0,1,0],
                          [0,1,0],
                          [0,1,0]]; 
        const firstGenResult = getNextGeneration(blinker);
        const firstGenExpectedResult = [[0,0,0],
                                        [1,1,1],
                                        [0,0,0]];
        firstGenResult.map((arr, i) => {
            arr.map((el, j)=> {
                expect(firstGenResult[i][j])
                .toBe(firstGenExpectedResult[i][j]);
            })
        });
        const secondGenResult = getNextGeneration(firstGenResult);
        secondGenResult.map((arr, i) => {
            arr.map((el, j)=> {
                expect(secondGenResult[i][j]).toBe(blinker[i][j]);
            })
        });
    });

    test('beacon should return to itself after 2 periods', ()=> {
        const beacon =   [[1,1,0,0],
                          [1,1,0,0],
                          [0,0,1,1],
                          [0,0,1,1]]; 
        const firstGenResult = getNextGeneration(beacon);
        const firstGenExpectedResult = [[1,1,0,0],
                                        [1,0,0,0],
                                        [0,0,0,1],
                                        [0,0,1,1]];
        firstGenResult.map((arr, i) => {
            arr.map((el, j)=> {
                expect(firstGenResult[i][j])
                .toBe(firstGenExpectedResult[i][j]);
            })
        });
        const secondGenResult = getNextGeneration(firstGenResult);
        secondGenResult.map((arr, i) => {
            arr.map((el, j)=> {
                expect(secondGenResult[i][j]).toBe(beacon[i][j]);
            })
        });
    });
});


    