const analyse   = require("./src/analyse");

const results   = analyse.start_analysing();

console.log(`Task completed - total boards: ${results.boards_count} - solved boards: ${results.solved_boards} - unsolvable boards: ${results.unsolvable_boards} - not solved boards: ${results.not_soved_boards}`);
console.log(`\n\n Task results \n 1. ${results.unsolvable_boards}; \n 2. ${results.sum_rolls}; \n\n`);