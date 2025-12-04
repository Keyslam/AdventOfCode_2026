import { Day, Result } from "../lib/day";

type Tile = {
    x: number;
    y: number;
    hasRoll: boolean;
};
type Grid = Tile[][];

const directions = [
    { dx: 0, dy: -1 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },

    { dx: -1, dy: -1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: 1, dy: 1 },
];

function hasLessThan4AdjacentRolls(grid: Grid, tile: Tile): boolean {
    let adjacentRolls = 0;

    for (const dir of directions) {
        const x = tile.x + dir.dx;
        const y = tile.y + dir.dy;

        if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
            if (grid[y][x].hasRoll) {
                adjacentRolls++;
            }
        }
    }

    return adjacentRolls < 4;
}

export class Day_04 extends Day {
    public part1(input: string): Result {
        const grid = this.parseInput(input);

        return grid
            .flatMap((row) => row)
            .filter((tile) => {
                return tile.hasRoll && hasLessThan4AdjacentRolls(grid, tile);
            })
            .reduce((acc) => acc + 1, 0);
    }

    public part2(input: string): Result {
        const grid = this.parseInput(input);

        let count = 0;

        while (true) {
            const accessibleRolls = grid
                .flatMap((row) => row)
                .filter((tile) => {
                    return (
                        tile.hasRoll && hasLessThan4AdjacentRolls(grid, tile)
                    );
                });

            const iterationCount = accessibleRolls.reduce((acc) => acc + 1, 0);

            accessibleRolls.forEach((tile) => {
                tile.hasRoll = false;
            });

            count += iterationCount;

            if (accessibleRolls.length === 0) {
                break;
            }
        }

        return count;
    }

    public getDir(): string {
        return __dirname;
    }

    private parseInput(input: string): Grid {
        const lines = input.split("\n");
        const grid: Grid = [];

        for (let y = 0; y < lines.length; y++) {
            const line = lines[y];
            const row: Tile[] = [];

            for (let x = 0; x < line.length; x++) {
                const char = line[x];

                row.push({
                    x,
                    y,
                    hasRoll: char === "@",
                });
            }
            grid.push(row);
        }

        return grid;
    }
}
