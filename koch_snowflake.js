const r = require("raylib");

function setup() {
    const WIDTH = 1000;
    const HEIGHT = 1000;
    const FPS = 80;

    r.InitWindow(WIDTH, HEIGHT, "China");
    r.SetTargetFPS(FPS);

    const palatte = {
        bg: r.WHITE,
        0: r.BLACK,
        1: { r: 245, g: 231, b: 188, a: 255 },
        2: r.RED,
    };

    const center = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
    };

    const world = { width: WIDTH, height: HEIGHT, palatte, center };
    return world;
}

function midPoint(p1, p2) {
    return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}

function drawSnowFlake(p1, p2, p3, depth = 3) {
    if (depth === 0) return;
    const A_midpoints = midPoint(p1, p2);
    const B_midpoints = midPoint(p2, p3);
    const C_midpoints = midPoint(p3, p1);
}

function draw(world) {
    const p1 = { x: 500, y: 300 };
    const p2 = { x: 300, y: 700 };
    const p3 = { x: 700, y: 700 };

    r.DrawTriangle(p1, p2, p3, r.BLACK);

    const p1_I = p2;
    const p2_I = { x: p1.x, y: p1.y + 2 * (p2.y - p1.y) };
    const p3_I = p3;

    r.DrawTriangle(p1_I, p2_I, p3_I, r.BLACK);
    // drawSnowFlake(p1, p2, p3, 1);
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(world.palatte.bg);

        draw(world);
        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
}

main();
