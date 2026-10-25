const r = require("raylib");

function setup() {
    const WIDTH = 700;
    const HEIGHT = 800;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "China");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.WHITE,
        1: { r: 94, g: 100, b: 100, a: 255 },
        2: { r: 241, g: 227, b: 175, a: 255 },
        3: { r: 222, g: 0, b: 100, a: 255 },
    };

    const center = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
    };

    const world = { width: WIDTH, height: HEIGHT, palatte, center };
    return world;
}

function quadrantOneCoordinate(x, y, world) {
    const coordinate = {};
    coordinate.x =
        x > world.center.x ? x : x + 2 * Math.abs(world.center.x - x);
    coordinate.y =
        y < world.center.y ? y : y - 2 * Math.abs(world.center.y - y);

    return coordinate;
}

function quadrantTwoCoordinate(x, y, world) {
    const coordinate = {};
    coordinate.x =
        x > world.center.x ? x : x + 2 * Math.abs(world.center.x - x);
    coordinate.y =
        y > world.center.y ? y : y + 2 * Math.abs(world.center.y - y);

    return coordinate;
}

function quadrantThreeCoordinate(x, y, world) {
    const coordinate = {};
    coordinate.x =
        x < world.center.x ? x : x - 2 * Math.abs(world.center.x - x);
    coordinate.y =
        y > world.center.y ? y : y + 2 * Math.abs(world.center.y - y);

    return coordinate;
}

function quadrantFourCoordinate(x, y, world) {
    const coordinate = {};
    coordinate.x =
        x < world.center.x ? x : x - 2 * Math.abs(world.center.x - x);
    coordinate.y =
        y < world.center.y ? y : y - 2 * Math.abs(world.center.y - y);

    return coordinate;
}

function getSymmetricPoint(x, y, world) {
    const points = [];

    points.push(quadrantOneCoordinate(x, y, world));
    points.push(quadrantTwoCoordinate(x, y, world));
    points.push(quadrantThreeCoordinate(x, y, world));
    points.push(quadrantFourCoordinate(x, y, world));

    return points;
}

function drawSymmetricCircles(x, y, radius, world) {
    const points = getSymmetricPoint(x, y, world);

    for (let i = 0; i < 4; i++) {
        r.DrawCircleV(points[i], radius, world.palatte[i]);
    }
}

function draw(world) {
    const x1 = 0 + (world.cf % world.width);
    const y1 = 0 + (world.cf % world.height);

    drawSymmetricCircles(x1, y1, 20, world);
}

function loop(world) {
    world.cf = 0;
    while (!r.WindowShouldClose()) {
        world.cf++;
        r.BeginDrawing();
        draw(world);
        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();
