const r = require("raylib");

function getTilesConfig(triangles) {
    const tile1 = [];
    const tile2 = [];
    const tile3 = [];
    const tile4 = [];
    const tile5 = [];
    const tile6 = [];
    const tile7 = [];
    const tile8 = [];
    const tile9 = [];

    for (let i = 0; i < 10; i++) {
        tile1[i] = [];
        tile2[i] = [];
        tile3[i] = [];
        tile4[i] = [];
        tile5[i] = [];
        tile6[i] = [];
        tile7[i] = [];
        tile8[i] = [];
        tile9[i] = [];

        for (let j = 0; j < 10; j++) {
            tile1[i][j] = triangles[(((i * j + 1) % 4) % 3) % 2];
            // tile2[i][j] = triangles[((i + j) % 4) % 3];
            // tile3[i][j] = triangles[((i + j) % 5) % 3];
            // tile4[i][j] = triangles[((i + j) % 3) % 2];
            // tile5[i][j] = triangles[(i * j) % 2];
            // tile6[i][j] = triangles[((i * j) % 3) % 2];
            // tile7[i][j] = triangles[j > i ? j % 2 : i % 2];
            // tile8[i][j] = triangles[j > i ? i % 2 : j % 2];
            // tile9[i][j] = triangles[j > i ? 1 : 0];
        }
    }

    // return [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
    return [tile1, tile2, tile3];
}

function getPositions() {
    return [
        { x: 20, y: 20 },
        // { x: 360, y: 20 },
        // { x: 700, y: 20 },
        // { x: 20, y: 360 },
        // { x: 360, y: 360 },
        // { x: 700, y: 360 },
        // { x: 20, y: 700 },
        // { x: 360, y: 700 },
        // { x: 700, y: 700 },
    ];
}

function setup() {
    const width = 1050;
    const height = 1050;
    const windowTitle = "render";
    const fps = 60;

    r.InitWindow(width, height, windowTitle);
    r.SetTargetFPS(fps);

    const target = r.LoadRenderTexture(64, 32);

    return {
        screen: { width, height },
        target,
    };
}

function drawPixel(i, j, position, image, pixelSize, target) {
    const x = i * pixelSize + position.x;
    const y = j * pixelSize + position.y;

    r.DrawTextureRec(target.texture, image, { x, y }, r.WHITE);
}

function drawTile(tile, position, target) {
    const pixelSize = 32;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            console.log(i, j);
            drawPixel(i, j, position, tile[i][j], pixelSize, target);
        }
    }
}

function draw(world) {
    const target = world.target;
    const triangle = {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
    };
    const invertedTriangle = {
        x: 32,
        y: 0,
        width: 32,
        height: 32,
    };

    const triangles = [invertedTriangle, triangle];

    const tiles = getTilesConfig(triangles);
    const positions = getPositions();

    for (let i = 0; i < 1; i++) {
        console.log(i);
        drawTile(tiles[i], positions[i], target);
    }
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    const triangle1 = {
        v1: { x: 32, y: 0 },
        v2: { x: 0, y: 0 },
        v3: { x: 0, y: 32 },
    };

    const triangle2 = {
        v1: { x: 64, y: 0 },
        v2: { x: 32, y: 32 },
        v3: { x: 64, y: 32 },
    };

    while (!r.WindowShouldClose()) {
        r.BeginTextureMode(world.target);
        r.DrawTriangle(triangle1.v1, triangle1.v2, triangle1.v3, r.RED);
        r.DrawTriangle(triangle2.v1, triangle2.v2, triangle2.v3, r.RED);

        r.EndTextureMode();

        r.BeginDrawing();
        r.ClearBackground(r.GOLD);
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
