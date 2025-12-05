import { Day_01 } from "./day_01/day_01";
import { Day_02 } from "./day_02/day_02";
import { Day_03 } from "./day_03/day_03";
import { Day_04 } from "./day_04/day_04";
import { Day_05 } from "./day_05/day_05";
import { Day_06 } from "./day_06/day_06";
import { Day_07 } from "./day_07/day_07";
import { Day_08 } from "./day_08/day_08";
import { Day_09 } from "./day_09/day_09";
import { Day_10 } from "./day_10/day_10";
import { Day_11 } from "./day_11/day_11";
import { Day_12 } from "./day_12/day_12";
import { Day } from "./lib/day";

const dayNumber = 5;
const days: Day[] = [
    new Day_01(),
    new Day_02(),
    new Day_03(),
    new Day_04(),
    new Day_05(),
    new Day_06(),
    new Day_07(),
    new Day_08(),
    new Day_09(),
    new Day_10(),
    new Day_11(),
    new Day_12(),
];

const day = days[dayNumber - 1];

const runResult = day.run();

console.log(
    `Part 1: ${runResult.part1.toString()} (${runResult.time1.toFixed(4)} ms)`
);

console.log(
    `Part 2: ${runResult.part2.toString()} (${runResult.time2.toFixed(4)} ms)`
);

console.log(
    "Total time:",
    (runResult.time1 + runResult.time2).toFixed(4),
    "ms"
);
