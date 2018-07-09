const _         = require("lodash");
const boards    = require("./maps/out/map.json");

let board = boards[0];

let chutes = _
    .chain(board.extras)
    .filter(extra => extra.type === "C")
    .keyBy("end")
    .value();

let ladders = _
    .chain(board.extras)
    .filter(extra => extra.type === "L")
    .keyBy("start")
    .value();

let matrix = {};

console.log("chutes", chutes);
console.log("ladders", ladders);

for (let i = 1; i < 101; i++) {
    matrix[i] = {};
    if(ladders[i]) {
        matrix[i][ladders[i].end] = 1/6
    }
    for (let j = 1; j < 101; j++) {
        if(j > i && j <= i+6) {
            matrix[i][j] = 1/6;
        }

        if(!matrix[i][j]) {
            matrix[i][j] = 0;
        }
    }
};

console.log("matrix", JSON.stringify(matrix));
