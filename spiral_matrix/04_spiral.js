const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 1000;
    const FPS = 100;

    r.InitWindow(WIDTH, HEIGHT, "China");
    r.SetTargetFPS(FPS);

    const matrix = {
        rows: 1000,
        columns: 1000,
        gap: 2,
    };

    const world = { width: WIDTH, height: HEIGHT, matrix };
    return world;
}

function drawCell(x, y, size, color, gap) {
    r.DrawRectangle(x + gap / 2, y + gap / 2, size - gap, size - gap, color);
}

function drawHorizontalStripU(st, end, strip, color, size, world) {
    for (let i = st; i <= end; i++) {
        const x_coordinate = size * i;
        const y_coordinate = strip * size + (world.cf % 500);

        drawCell(x_coordinate, y_coordinate, size, color, world.matrix.gap);
    }
}

function drawHorizontalStripD(st, end, strip, color, size, world) {
    for (let i = st; i <= end; i++) {
        const x_coordinate = size * i;
        const y_coordinate = strip * size - (world.cf % 500);

        drawCell(x_coordinate, y_coordinate, size, color, world.matrix.gap);
    }
}

function drawVerticalStripL(st, end, strip, color, size, world) {
    for (let i = st; i <= end; i++) {
        const x_coordinate = strip * size;
        const y_coordinate = size * i;

        drawCell(x_coordinate, y_coordinate, size, color, world.matrix.gap);
    }
}

function drawVerticalStripR(st, end, strip, color, size, world) {
    for (let i = st; i <= end; i++) {
        const x_coordinate = strip * size;
        const y_coordinate = size * i;

        drawCell(x_coordinate, y_coordinate, size, color, world.matrix.gap);
    }
}

function draw(world) {
    const cellHeight = world.height / world.matrix.rows;
    const cellWidth = world.width / world.matrix.columns;

    const size = Math.min(cellHeight, cellWidth);

    let rowSt = 0;
    let rowEnd = world.matrix.rows - 1;

    let colSt = 0;
    let colEnd = world.matrix.columns - 1;

    const color = {
        r: 16,
        g: 15,
        b: 48,
        a: 240,
    };

    while (rowSt <= rowEnd && colSt <= colEnd) {
        drawHorizontalStripU(colSt, colEnd, rowSt, color, size, world);
        rowSt++;

        drawVerticalStripR(rowSt, rowEnd, colEnd, color, size, world);
        colEnd--;

        drawHorizontalStripD(colSt, colEnd, rowEnd, color, size, world);
        rowEnd--;

        drawVerticalStripL(rowSt, rowEnd, colSt, color, size, world);
        colSt++;

        color.a -= 10;
    }
}

function loop(world) {
    world.cf = 0;
    while (!r.WindowShouldClose()) {
        world.cf++;
        r.BeginDrawing();
        r.ClearBackground(r.GREEN);
        draw(world);
        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();
