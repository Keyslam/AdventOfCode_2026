import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Result = symbol | number | string;
export type RunResult = {
    part1: Result;
    time1: number;
    part2: Result;
    time2: number;
};

export abstract class Day {
    public run(): RunResult {
        const input = this.readInput();

        const start1 = performance.now();
        const part1 = this.part1(input);
        const time1 = performance.now() - start1;

        const start2 = performance.now();
        const part2 = this.part2(input);
        const time2 = performance.now() - start2;

        return { part1, time1, part2, time2 };
    }

    public abstract part1(input: string): Result;
    public abstract part2(input: string): Result;

    public abstract getDir(): string;

    private readInput(): string {
        const file = join(this.getDir(), `input.txt`);
        return readFileSync(file, "utf-8").trimEnd();
    }
}
