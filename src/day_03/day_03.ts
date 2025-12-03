import { Day, Result } from "../lib/day";

type Bank = number[];

function findFirstBiggestIndex(
    bank: Bank,
    skipFirst: number,
    skipLast: number
): number {
    let biggest = 0;
    let biggestIndex = -1;

    for (let i = skipFirst; i < bank.length - skipLast; i++) {
        const v = bank[i];

        if (v > biggest) {
            biggest = v;
            biggestIndex = i;
        }
    }

    return biggestIndex;
}

function findBiggestSequence(bank: Bank, length: number): number {
    const sequenceIndices = [];

    for (let i = 0; i < length; i++) {
        const lastIndex = sequenceIndices[i - 1] ?? -1;

        const index = findFirstBiggestIndex(
            bank,
            lastIndex + 1,
            length - i - 1
        );
        sequenceIndices.push(index);
    }

    return sequenceIndices
        .map((i) => bank[i])
        .reduce((acc, v, i) => {
            const digit = Math.pow(10, length - i - 1);
            return acc + v * digit;
        }, 0);
}

export class Day_03 extends Day {
    public part1(input: string): Result {
        return this.parsteInput(input)
            .map((bank) => {
                return findBiggestSequence(bank, 2);
            })
            .reduce((acc, v) => acc + v, 0);
    }

    public part2(input: string): Result {
        return this.parsteInput(input)
            .map((bank) => {
                return findBiggestSequence(bank, 12);
            })
            .reduce((acc, v) => acc + v, 0);
    }

    public getDir(): string {
        return __dirname;
    }

    public parsteInput(input: string): Bank[] {
        return input //
            .split("\n")
            .map((line) => line.split("").map(Number));
    }
}
