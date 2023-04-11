let nums = [12, 25, 14, 69, 24, 78, -2, 45, -56, 24, 24, -100, -100, 100];

function max_min(array){
    let minValue = array[0];
    let maxValue = array[0];
    for (let num of array){
        if (num < minValue){
            minValue = num;
        }
        if (num > maxValue){
            maxValue = num;
        }
    }
    return [minValue, maxValue];
}

let minNum = max_min(nums)[0];
let maxNum = max_min(nums)[1];
console.log(`La suma de ${minNum} y ${maxNum} es: ${minNum + maxNum}`);