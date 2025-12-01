import { Day, Result } from "../lib/day";

type Command = {
    direction: "left" | "right";
    amount: number;
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

export class Day_01 extends Day {
    public part1(input: string): Result {
        const commands = this.parseInput(input);
        let position = 50;
        let hits = 0;

        for (const command of commands) {
            position = this.executeCommand(position, command)[0];

            if (position === 0) {
                hits++;
            }
        }

        return hits;
    }

    public part2(input: string): Result {
        const commands = this.parseInput(input);
        let position = 50;
        let hits = 0;

        for (const command of commands) {
            const [newPosition, newHits] = this.executeCommand(
                position,
                command
            );

            position = newPosition;
            hits += newHits;
        }

        return hits;
    }

    public getDir(): string {
        return __dirname;
    }

    private parseInput(input: string): Command[] {
        return input.split("\n").map((line) => {
            const operation = line.substring(0, 1) === "L" ? "left" : "right";
            const amount = parseInt(line.substring(1));

            return {
                direction: operation,
                amount: amount,
            };
        });
    }

    private executeCommand(
        position: number,
        command: Command
    ): [number, number] {
        if (command.direction === "left") {
            return this.moveLeft(position, command.amount);
        } else {
            return this.moveRight(position, command.amount);
        }
    }

    private moveLeft(position: number, amount: number): [number, number] {
        let zeros = 0;

        for (let i = 1; i <= amount; i++) {
            const newPosition = mod(position - i, 100);
            if (newPosition === 0) {
                zeros++;
            }
        }

        return [mod(position - amount, 100), zeros];
    }

    private moveRight(position: number, amount: number): [number, number] {
        let zeros = 0;

        for (let i = 1; i <= amount; i++) {
            const newPosition = mod(position + i, 100);
            if (newPosition === 0) {
                zeros++;
            }
        }

        return [mod(position + amount, 100), zeros];
    }
}
