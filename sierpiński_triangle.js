const r = require("raylib");

function setup() {
    const width = 500;
    const height = 500;
    const windowTitle = "Random number";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const window = { width, height };

    const triangle = {
        a: { x: 250, y: 0 },
        b: { x: 0, y: 500 },
        c: { x: 500, y: 500 },
    };

    return {
        window,
        triangle,
    };
}

function midPoint(pointA, pointB) {
    return {
        x: Math.abs(pointB.x + pointA.x) / 2,
        y: Math.abs(pointB.y + pointA.y) / 2,
    };
}
function drawRecursiveTriangles(triangle, depth = 2) {
    if (depth < 1) return;
    const { a, b, c } = triangle;

    const midPointAB = midPoint(a, b);
    const midPointBC = midPoint(b, c);
    const midPointCA = midPoint(c, a);

    r.DrawTriangle(midPointAB, midPointBC, midPointCA, r.WHITE);

    drawRecursiveTriangles({ a, b: midPointAB, c: midPointCA }, depth - 1);
    drawRecursiveTriangles({ a: midPointAB, b, c: midPointBC }, depth - 1);
    drawRecursiveTriangles({ a: midPointCA, b: midPointBC, c }, depth - 1);
}

function draw(world) {
    const triangle = world.triangle;

    r.DrawTriangle(triangle.a, triangle.b, triangle.c, r.BLACK);
    drawRecursiveTriangles(triangle, 10);
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(r.WHITE);
        draw(world);

        r.EndDrawing();
    }
}

function main() {
    const world = setup();
    loop(world);
    teardown();
}

main();
