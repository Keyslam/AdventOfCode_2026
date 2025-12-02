import { Day, Result } from "../lib/day";

type Range = {
    min: number;
    max: number;
};

function countDigits(n: number): number {
    return Math.floor(Math.log10(n)) + 1;
}

function isMadeOfPattern(str: string, pattern: string): boolean {
    const regex = new RegExp(`^(?:${pattern})+$`);
    return regex.test(str);
}

export class Day_02 extends Day {
    public part1(input: string): Result {
        return this.parseInput(input)
            .flatMap((range) => {
                return Array.from(
                    { length: range.max - range.min + 1 },
                    (_, i) => range.min + i
                );
            })
            .filter((num) => {
                const digits = countDigits(num);
                if (digits % 2 !== 0) return false;

                const left = Math.floor(num / Math.pow(10, digits / 2));
                const right = num % Math.pow(10, Math.floor(digits / 2));

                return left === right;
            })
            .reduce((acc, v) => acc + v, 0);
    }

    public part2(input: string): Result {
        return this.parseInput(input)
            .flatMap((range) => {
                return Array.from(
                    { length: range.max - range.min + 1 },
                    (_, i) => range.min + i
                );
            })
            .map((num) => num.toString())
            .filter((num) => {
                for (let start = 0; start < num.length; start++) {
                    for (let end = start + 1; end <= num.length; end++) {
                        const pattern = num.slice(start, end);

                        if (pattern === num) continue;
                        if (isMadeOfPattern(num, pattern)) return true;
                    }
                }

                return false;
            })
            .reduce((acc, v) => acc + Number.parseInt(v), 0);
    }

    public getDir(): string {
        return __dirname;
    }

    private parseInput(input: string): Range[] {
        return input.split(",").map((range) => ({
            min: parseInt(range.split("-")[0]),
            max: parseInt(range.split("-")[1]),
        }));
    }
}
