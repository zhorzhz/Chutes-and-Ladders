const _     = require("lodash");
const fs    = require("fs");

const boards =  JSON.parse(fs.readFileSync('./map.json', 'utf8'));

let position = 0;

let result = [];

for(let i = 0; i < 10; i++) {
    const map               = boards[0].map;
    const extras            = boards[0].extras;
    const final_position    = map[0]*map[1];
    const chutes = _
        .chain(extras)
        .filter(extra => {
            return extra.type === "C";
        })
        .map("end")
        .value();
    const ladders = _
        .chain(extras)
        .filter(extra => {
            return extra.type === "L";
        })
        .map("start")
        .value();
    let rolls = 0;

    return console.log(JSON.stringify(extras));


    while (position !== final_position) {
        let steps  = _.random(1, 6);
        let new_possible_position   = position + steps;
        console.log("psososos", position, steps);

        if(_.includes(chutes, new_possible_position)){
            position = _
                .chain(extras)
                .find(extra => {
                    return extra.type === "C" && extra.end === new_possible_position;
                })
                .map("start")
                .value();
            console.log("llll", position);
            break;
        } else if(_.includes(ladders, new_possible_position)){
            position = _
                .chain(extras)
                .find(extra => {
                    return extra.type === "L" && extra.start === new_possible_position;
                })
                .map("end")
                .value();
        } else {
            position = new_possible_position
        }

        rolls++;

        if(position === final_position) {
            console.log(`I am done :D - position: ${position} - steps: ${rolls}`);
            result.push(rolls);
        }

        if(rolls > 10) {
            console.log(`Sorry but Im stuck :((( - position: ${position} - steps: ${rolls}`);
            break;
        }
        console.log(`One Roll Done - position: ${position} - steps: ${rolls}`);
    }
};
// console.log("check", check, JSON.stringify(unsolvable));

console.log("\n\n 0", boards[112]);
console.log("\n\n 1", boards[1943]);