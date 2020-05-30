const { validateGOLInput } = require("../routes/gol-route");

describe('validateGOLInput tests', () => {
    test('should throw error on empty/null input', ()=> {
        let badinput; 
        expect(()=> validateGOLInput(badinput)).toThrow();
        badinput=null;        
        expect(()=> validateGOLInput(badinput)).toThrow();
    });

    test('should throw error on non-twodim array', ()=> {
        let badinput = {bad: "input"}; 
        expect(()=> validateGOLInput(badinput)).toThrow();
        
        badinput = [0,1,1];         
        expect(()=> validateGOLInput(badinput)).toThrow();

        let goodInput = [[0,0,0], [0,0,0], [0,0,0]];         
        expect(()=> validateGOLInput(goodInput)).not.toThrow();
    });

    test('should only allow two-dim arrays with the same row length', ()=> {
        let badinput = [[0,0], [0,0,0], [0,0,0]];  
        expect(()=> validateGOLInput(badinput)).toThrow();
        
        badinput = [[0,0,0], [0,1], [0,0,0]];        
        expect(()=> validateGOLInput(badinput)).toThrow();

        badinput = [[0,0,0], [], [0,0,0]];        
        expect(()=> validateGOLInput(badinput)).toThrow();

        let goodInput = [[0,0,0], [0,0,0], [0,0,0]];         
        expect(()=> validateGOLInput(goodInput)).not.toThrow();
    });

    test('should only allow two-dim arrays with 0 and 1 values', ()=> {
        let badinput = [["string","sting",0], [0,"sting",0], [0,0,0]];  
        expect(()=> validateGOLInput(badinput)).toThrow();

        badinput = [[{o:"name"},0,0], [0,0,0], [0,0,0]];  
        expect(()=> validateGOLInput(badinput)).toThrow();

        badinput = [[11,0,0], [0,0,0], [0,0,11]]; 
        expect(()=> validateGOLInput(badinput)).toThrow();

        let goodInput = [[0,0,0], [0,0,0], [0,0,0]];         
        expect(()=> validateGOLInput(goodInput)).not.toThrow();
        
        goodInput = [[1,0,1], [0,1,0], [0,0,0]]; 
        expect(()=> validateGOLInput(goodInput)).not.toThrow();
    });   
});
