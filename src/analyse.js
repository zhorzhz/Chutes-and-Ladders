const _         = require("lodash");
const fs        = require("fs");
const boards    = require("./maps/out/map.json");

let unsolvable_boards   = 0; //-- number of boards which are NOT POSSIBLE to solve
let not_soved_boards    = 0; //-- number of boards which we COULD NOT solve
let solved_boards       = 0; //-- number of solved boards
let sum_rolls           = 0; //-- sum of rolls required to win on each solvable board

console.time("challenge"); //-- start the timer

const start_analysing = () => {
//-- Run over all boards
    _.forEach(boards, board => {
        const map = board.map;        //-- get the information about map (width and height)
        const extras = board.extras;     //-- get all extras of current map (chutes and ladders)
        const final_position = map[0] * map[1];    //-- find the final winning position for current map
        
        let position = 0;                        //-- lets say that our current position is 0
        let rolls = 0;                        //-- will be used for counting number of rolls
        
        //-- Do Rolls before our current position will match with winning final position
        while (position !== final_position) {
            //-- Array with ALL chute's TOP positions
            let all_chutes = _.chain(extras).filter(extra => {
                return extra.type === "C";
            }).map("end").value();
            
            //-- Try to find nearest ladder
            let ladder = _.chain(extras).filter(extra => extra.start > position && extra.start <= position + 6).filter(extra => {
                //-- exclude ladders which's bottom or top position matches with one of chutes TOP position
                return extra.type === "L" && !_.includes(all_chutes, extra.end) && !_.includes(all_chutes, extra.start);
            }).orderBy("end", "desc").map("end").head().value();
            
            //-- Always use ladder if it is possible
            if (ladder) {
                //-- If ladder was found, then update the current position with ladder's TOP position
                position = ladder;
            } else {
                //-- In case of not finding nearby ladder we should use simple steps from 1 to 6
                //-- But the same time be aware from touching to any chute
                
                //-- Find max possible secure steps
                let steps = _.chain([1, 2, 3, 4, 5, 6]).filter(possible_step => {
                    //-- Make sure to not cross final position, (so our current position + steps <= final position)
                    //-- Avoid from touching chutes
                    return position + possible_step <= final_position && !_.includes(all_chutes, position + possible_step);
                }).max().value();
                
                //-- If there is no possible step to make, then this board is not possible to solve
                //-- But Don't get sad because of this, just update the info and keep going ;)
                if (!steps) {
                    // console.log(`Board is unsolvable :((( - position: ${position} - steps: ${rolls}`);
                    unsolvable_boards++; //-- update numbers of unsolvable boards
                    break;
                }
                
                position += steps; //-- Update current position
            }
            
            rolls++; //-- update the number of rolls made
            
            //-- If our current position is already the winning final position then count this board as solved
            if (position === final_position) {
                // console.log(`I am done :D - position: ${position} - steps: ${rolls}`);
                solved_boards++; //-- update number of solved boards
                sum_rolls += rolls;
            }
            
            // TODO remove
            //-- Just security check: to make sure that we are not running in forever loop because of bug :D
            if (rolls > 100) {
                //-- If we are in forever loop then there is issue with solving this board
                //-- But again don't be sad because of this, just update number of not solved board and keep going ;)
                console.log(`Sorry but Im stuck :((( - position: ${position} - steps: ${rolls}`);
                not_soved_boards++; //-- update number of board which we couldn't solve
                break;
            }
            
            // console.log(`One Roll Done - position: ${position} - steps: ${rolls}`);
        }
    });
    console.timeEnd("challenge");
    
    return {
        unsolvable_boards,
        not_soved_boards,
        solved_boards,
        sum_rolls,
        boards_count    : boards.length,
    };
};

module.exports = {
    start_analysing
};



