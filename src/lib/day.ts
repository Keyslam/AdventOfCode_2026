import { readFileSync } from "node:fs";
import { join } from "node:path";

export type Result = symbol | number | string;

export abstract class Day {
    public run(): [Result, Result] {
        const input = this.readInput();

        const result1 = this.part1(input);
        const result2 = this.part2(input);

        return [result1, result2];
    }

    public abstract part1(input: string): Result;
    public abstract part2(input: string): Result;

    public abstract getDir(): string;

    private readInput(): string {
        const file = join(this.getDir(), `input.txt`);
        return readFileSync(file, "utf-8").trimEnd();
    }
}
