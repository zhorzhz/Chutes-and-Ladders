const test      = require("ava");
const analyse   = require("./analyse");

test.serial("[analyse]", (t) => {
    const result = analyse.start_analysing();
    
    t.is(result.not_soved_boards, 0);
    t.is(result.unsolvable_boards, 0);
    t.is(result.solved_boards, 1);
    t.is(result.sum_rolls, 7);
});