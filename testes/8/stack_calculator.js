// 8-2*2
//*1 -2

let calculo = "8*2-2+4/25/1";

let nums = [];
let operators = [];

let chars = calculo.split('');

const precedence = {
    "*": 1,
    "/": 1,
    "+": 2,
    "-": 2
};

for (let i = 0; i < chars.length; i++){

    if (!isNaN(Number(chars[i]))){
        nums.push(chars[i]);
    }else{
        operators.push(chars[i]);
    }
}

operators.sort((a, b) => precedence[b] - precedence[a]);

console.log(nums);
console.log(operators);

let gride = [];

for (let i = 0; i < 5; i++){
    let row = [];
    for (let j = 0; j < 3; j++){
        row.push(i);
    }
    gride.push(row);
}

console.log("\n");

for (let i = 0; i < gride.length; i++){
    console.log(gride[i]);

}