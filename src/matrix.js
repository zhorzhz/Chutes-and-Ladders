const _         = require("lodash");
const boards    = require("./maps/out/map.json");

let sum         = 0;
let unsolvable  = 0;

_.forEach(boards, (board, board_number) => {
    
    let chutes = _.chain(board.extras).filter(extra => extra.type === "C").keyBy("end").value();
    
    let ladders = _.chain(board.extras).filter(extra => extra.type === "L").keyBy("start").value();
    
    let matrix = [];
    
    for (let i = 0; i < 101; i++) {
        matrix[i] = [];
        for (let j = 0; j < 101; j++) {
            let possible_position = j;
            if (j <= i || j > i + 6) {
                continue;
            }
            
            if (ladders[j]) {
                possible_position = ladders[j].end;
            }
            
            if (chutes[j]) {
                possible_position = chutes[j].start;
            }
            
            matrix[i].push(possible_position);
        }
    }

// console.log("matrix", JSON.stringify(matrix));
    
    let finish = 100;
    let all_rolls = [];
    
    for (let tries = 0; tries < 10; tries++) {
        let current_position = 0;
        all_rolls[tries] = 0;
        
        while (current_position !== finish) {
            let block = matrix[current_position];
            
            if(_.isEmpty(block)) {
                console.log("Unsolvable found", board_number);
                unsolvable++;
                break;
            }
            
            // console.log("block", block);
            
            current_position = block[_.random(0, block.length - 1)];
            all_rolls[tries]++;
            
            // console.log("position", current_position);
        }
    }
    
    sum += _.mean(all_rolls);
    console.log("done", _.mean(all_rolls), sum);
});