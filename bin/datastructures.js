'use strict';

/*
const arry1 = [2, 1, 5, 6];
const hash1 = {
    color: 'red',
    taste: 'sweet',
    weight: 'heavy'
};

console.log(arry1);
console.log(hash1);

const arry2 = [
    3,
    'melisa',
    45,
    'mariana'
];

console.log(arry2);

const arry3 = [
    'puneet',
    arry1,
    'mariana'
];

console.log(arry3);

const hash2 = {
    one: arry3,
    two: 'sidorela',
    three: hash1
};

console.log(hash2);

const square = function(elem) {
    console.log(elem * elem);
};

arry1.forEach(square);
*/

const data = [
    {
        program: 'tree planting',
        operations: 546754,
        investments: 3454753,
        personnel: 345353
    },
    {
        program: 'trash pickup',
        operations: 86564345,
        investments: 345454753,
        personnel: 453
    },
    {
        program: 'fix holes in curb',
        operations: 56765,
        investments: 234234,
        personnel: 6757
    }
];

let totalOperations = 0;
let totalInvestments = 0;
let totalPersonnel = 0;

// const myFunc = function(element, index) {
//     totalOperations = totalOperations + element.operations; 
//     totalInvestments = totalInvestments + element.investments;
//     totalPersonnel = totalPersonnel + element.personnel;
//     console.log(totalOperations);
// };

// data.forEach(myFunc);
let i=0;
let j=data.length;

for (; i<j; i=i+1) {
    totalOperations = totalOperations + data[i].operations;
    totalInvestments = totalInvestments + data[i].investments;
    totalPersonnel = totalPersonnel + data[i].personnel;
}

console.log("total operations: " + totalOperations);
console.log("total investments: " + totalInvestments);
console.log("total personnel: " + totalPersonnel);
console.log("total of everything: " + (totalOperations + totalInvestments + totalPersonnel));