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
            tile1[i][j] = triangles[j % 2];
            tile2[i][j] = triangles[i % 2];
            tile3[i][j] = triangles[(i + j) % 2];
            tile4[i][j] = triangles[((i + j) % 3) % 2];
            tile5[i][j] = triangles[(i * j) % 2];
            tile6[i][j] = triangles[((i * j) % 3) % 2];
            tile7[i][j] = triangles[j > i ? j % 2 : i % 2];
            tile8[i][j] = triangles[j > i ? i % 2 : j % 2];
            tile9[i][j] = triangles[j > i ? 1 : 0];
        }
    }

    return [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
}

function getPositions() {
    return [
        { x: 20, y: 20 },
        { x: 360, y: 20 },
        { x: 700, y: 20 },
        { x: 20, y: 360 },
        { x: 360, y: 360 },
        { x: 700, y: 360 },
        { x: 20, y: 700 },
        { x: 360, y: 700 },
        { x: 700, y: 700 },
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

    const triangleToDraw = [
        {
            v1: { x: 32, y: 0 },
            v2: { x: 0, y: 0 },
            v3: { x: 0, y: 32 },
        },
        {
            v1: { x: 64, y: 0 },
            v2: { x: 32, y: 32 },
            v3: { x: 64, y: 32 },
        },
    ];

    r.BeginTextureMode(target);

    r.DrawTriangle(
        triangleToDraw[0].v1,
        triangleToDraw[0].v2,
        triangleToDraw[0].v3,
        r.WHITE,
    );
    r.DrawTriangle(
        triangleToDraw[1].v1,
        triangleToDraw[1].v2,
        triangleToDraw[1].v3,
        r.WHITE,
    );

    r.EndTextureMode();

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

    return {
        screen: { width, height },
        target,
        triangles,
        tiles,
        positions,
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
            drawPixel(i, j, position, tile[i][j], pixelSize, target);
        }
    }
}

function draw(world) {
    const target = world.target;
    const tiles = world.tiles;
    const positions = world.positions;

    for (let i = 0; i < 9; i++) {
        drawTile(tiles[i], positions[i], target);
    }
}

function teardown() {
    r.CloseWindow();
}

function loop(world) {
    while (!r.WindowShouldClose()) {
        r.BeginDrawing();
        r.ClearBackground(r.DARKBLUE);
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
