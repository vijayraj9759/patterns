const r = require("raylib");

function centroid(triangle) {
    const a = triangle.a;
    const b = triangle.b;
    const c = triangle.c;

    return { x: (a.x + b.x + c.x) / 3, y: (a.y + b.y + c.y) / 3 };
}

function calculateDistance(pointA, pointB) {
    const x1 = pointA.x;
    const x2 = pointB.x;
    const y1 = pointA.y;
    const y2 = pointB.y;

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function radian(degree) {
    return (Math.PI / 180) * degree;
}

function degree(radian) {
    return (180 / Math.PI) * radian;
}

function calculateAngleByX(xValue, radius) {
    return degree(Math.acos(xValue / radius));
}
function calculateAngleByY(xValue, radius) {
    return degree(Math.asin(xValue / radius));
}

function generatePolarCoordinates(radius, angle) {
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
}

function rotatePoint(point, radius, center, angle) {
    const angleXFromOrigin = calculateAngleByX(point.x - center.x, radius);
    const angleYFromOrigin = calculateAngleByY(
        Math.abs(point.y - center.y),
        radius,
    );
    console.log(angleXFromOrigin, angleYFromOrigin);
    const rotationAngle = radian(angleYFromOrigin + angle);

    const cx = translate(
        center,
        generatePolarCoordinates(radius, radian(angleYFromOrigin)),
    );
    const cy = translate(
        center,
        generatePolarCoordinates(radius, radian(angleXFromOrigin)),
    );
    console.log({ x: cx }, { y: cy });
    // // console.log(angleFromOrigin + angle);

    // const coordinates = translate(
    //     center,
    //     generatePolarCoordinates(radius, rotationAngle),
    // );

    // console.log(coordinates);
    return generatePolarCoordinates(radius, rotationAngle);
}

function translate(base, offset) {
    return r.Vector2Add(base, offset);
}

function rotateTriangle(triangle) {
    const center = centroid(triangle);

    const radiusCenterToA = calculateDistance(center, triangle.a);
    const radiusCenterToB = calculateDistance(center, triangle.b);
    const radiusCenterToC = calculateDistance(center, triangle.c);

    const rotatedA = rotatePoint(triangle.a, radiusCenterToA, center, 180);
    const rotatedB = rotatePoint(triangle.b, radiusCenterToB, center, 180);
    const rotatedC = rotatePoint(triangle.c, radiusCenterToC, center, 180);

    const scaledA = translate(center, rotatedA);
    const scaledB = translate(center, rotatedB);
    const scaledC = translate(center, rotatedC);

    return { a: scaledA, b: scaledB, c: scaledC };
}

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

    const triangle = {
        a: { x: 250, y: 33.5 },
        b: { x: 33.5, y: 408.5 },
        c: { x: 466.5, y: 408.5 },
    };

    const invertedTriangle = rotateTriangle(triangle);
    // console.log({ t: triangle }, { iT: invertedTriangle });

    const window = { width: WIDTH, height: HEIGHT };

    const world = { window, palatte, triangle, invertedTriangle };
    return world;
}

function draw(world) {
    const triangle = world.triangle;
    const invertedTriangle = world.invertedTriangle;

    r.DrawTriangle(triangle.a, triangle.b, triangle.c, r.BLACK);
    r.DrawTriangle(
        invertedTriangle.a,
        invertedTriangle.c,
        invertedTriangle.b,
        r.BLUE,
    );
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
