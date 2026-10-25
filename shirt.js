const r = require("raylib");

function setup() {
    const WIDTH = 700;
    const HEIGHT = 800;
    const FPS = 60;

    r.InitWindow(WIDTH, HEIGHT, "China");
    r.SetTargetFPS(FPS);

    const flag = {
        rows: 5,
        columns: 10,
    };

    const palatte = {
        bg: r.WHITE,
        0: r.WHITE,
        1: { r: 94, g: 100, b: 100, a: 255 },
    };

    const world = { width: WIDTH, height: HEIGHT, flag, palatte };
    return world;
}

function chooseColor(row, column) {
    return (row + column) % 2 === 0 ? r.RED : r.GOLD;
}

function draw(world) {
    const cellHeight = world.height / world.flag.rows;
    const cellWidth = world.width / world.flag.columns;

    const size = Math.min(cellHeight, cellWidth);
    let x_coordinate = 0;
    let y_coordinate = 0;

    // r.DrawRing({ x: 100, y: 100 }, 50, 70, 0, 360, 360, world.palatte[0]);
    r.DrawLineEx(
        { x: 50, y: 0 },
        { x: 50, y: world.height },
        20,
        world.palatte[0],
    );
    r.DrawLineEx(
        { x: 250, y: 0 },
        { x: 250, y: world.height },
        20,
        world.palatte[0],
    );
    r.DrawLineEx(
        { x: 450, y: 0 },
        { x: 450, y: world.height },
        20,
        world.palatte[0],
    );
    r.DrawLineEx(
        { x: 650, y: 0 },
        { x: 650, y: world.height },
        20,
        world.palatte[0],
    );
    r.DrawLineEx({ x: 50, y: 400 }, { x: 650, y: 0 }, 20, world.palatte[0]);
    r.DrawLineEx({ x: 50, y: 200 }, { x: 450, y: 0 }, 20, world.palatte[0]);

    // r.DrawLineEx(
    //     { x: 45, y: 0 },
    //     { x: world.width, y: world.height / 2 },
    //     20,
    //     world.palatte[0],
    // );
    // r.DrawLineEx(
    //     { x: 0, y: 100 },
    //     { x: world.width, y: world.height / 2 + 200 },
    //     20,
    //     world.palatte[0],
    // );
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(world.palatte[1]);

        draw(world);
        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();
