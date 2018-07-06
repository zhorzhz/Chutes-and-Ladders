const _         = require("lodash");
const fs        = require("fs");
const path      = require("path");
const minimist  = require("minimist");

const args      = minimist(process.argv.slice(2));
const input     = args.in || `chutes_and_ladders.txt`;

const file = fs.readFileSync(path.resolve(__dirname, `maps/in/${input}`)).toString().split(/\n/g).map(s => s.split(" ").map(s => s));

let result = [];


let grouped_values = [];
let grouping_index = 0;

console.time("read");

_.forEach(file, field => {
    if(field[0] !== ""){
        if(!grouped_values[grouping_index]){
            grouped_values[grouping_index] = [];
        }
        grouped_values[grouping_index].push(field);
    } else {
        grouping_index++
    }
});

_.forEach(grouped_values, (group, group_key) => {
    _.forEach(group, (value, value_key) => {
        if(!result[group_key]){
            result[group_key] = [];
        }
        if(value_key === 0){
            result[group_key] = {
                map     : [value[0], value[1]],
                extras  : [],
            };
        } else {
            result[group_key].extras.push({
                type: value[0],
                start: parseInt(value[1]),
                end: parseInt(value[2]),
            })
        }
    });
});



console.timeEnd("read");

fs.writeFileSync(path.resolve(__dirname, "maps/out/map.json"), JSON.stringify(result));

console.log("Map was generated, please check ./out folder");