import { Day, Result } from "../lib/day";

type Range = {
    start: number;
    end: number;
};

export class Day_05 extends Day {
    public part1(input: string): Result {
        const { ranges, ingredients } = this.parseInput(input);

        return ingredients
            .filter((ingredients) => {
                return ranges.some((range) => {
                    return (
                        ingredients >= range.start && ingredients <= range.end
                    );
                });
            })
            .reduce((acc) => acc + 1, 0);
    }

    public part2(input: string): Result {
        const newRanges = new Set<Range>();
        const { ranges } = this.parseInput(input);

        ranges.forEach((range) => {
            const overlappingRanges: Range[] = [];

            for (const otherRanges of newRanges) {
                if (
                    range.start <= otherRanges.end &&
                    range.end >= otherRanges.start
                ) {
                    overlappingRanges.push(otherRanges);
                }
            }

            overlappingRanges.forEach((r) => newRanges.delete(r));

            range.start = Math.min(
                range.start,
                ...overlappingRanges.map((r) => r.start)
            );

            range.end = Math.max(
                range.end,
                ...overlappingRanges.map((r) => r.end)
            );

            newRanges.add(range);
        });

        return [...newRanges].reduce(
            (acc, range) => acc + (range.end - range.start + 1),
            0
        );
    }

    public getDir(): string {
        return __dirname;
    }

    private parseInput(input: string): {
        ranges: Range[];
        ingredients: number[];
    } {
        const ranges = input
            .split("\n\n")[0]
            .split("\n")
            .map((line) => {
                return {
                    start: parseInt(line.split("-")[0]),
                    end: parseInt(line.split("-")[1]),
                };
            });

        const ingredients = input
            .split("\n\n")[1]
            .split("\n")
            .map((line) => parseInt(line));

        return {
            ranges,
            ingredients,
        };
    }
}
