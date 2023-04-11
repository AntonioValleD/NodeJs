const assert = require('chai').assert;

function sumOperaion(a, b){
    return a + b;
}

describe('Unit test No.1', () => {
    it ('Should return 4', () => {
        let result = sumOperaion(1, 3);
        assert.equal(result, 4);
    });
});