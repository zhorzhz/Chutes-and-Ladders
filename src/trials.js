const _     = require("lodash");
const fs    = require("fs");

const boards =  JSON.parse(fs.readFileSync('./map.json', 'utf8'));
let check  = 0;
let unsolvable = [];

_.forEach(boards, (board, key) => {
    const map               = board.map;
    const extras            = board.extras;
    const final_position    = map[0]*map[1];

    let chutes = _
        .chain(extras)
        .filter(extra => {
            return extra.type === "C";
        })
        .map("end")
        .value();

    if(chutes.indexOf(final_position) !== -1) {
        check++;
        unsolvable.push(key);
        // console.log("shit happened", chutes, final_position, key);
    }
});
// console.log("check", check, JSON.stringify(unsolvable));

console.log("\n\n 0", boards[112]);
console.log("\n\n 1", boards[1943]);