import K from "../kaboom";
import marioTileset from "../../assets/images/tileset/mario_tileset.png";
import { testLevel, level2 } from "../levels/layouts";
import pika from "../../assets/images/sprites/pika.png";
import mario from "../../assets/images/sprites/mario/sm-mario-one.png";
import cloud from "../../assets/images/sprites/mario/sm-cloud.png";
import pipe from "../../assets/images/sprites/mario/sm-pipe.png";
import castle from "../../assets/images/sprites/mario/sm-castle.png";
import hill from "../../assets/images/sprites/mario/sm-hill.png";
import { Boss, Enemy } from "./Enemy";

export class Level {
  constructor(player, enemyLoop, homingEnemyLoop) {
    this.bossActive = false;
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("cloud", cloud);
    K.loadSprite("pipe", pipe, { sliceX: 1, sliceY: 2 });
    K.loadSprite("prize", mario);
    K.addLevel(testLevel, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // Ground tile
        "=": () => [
          K.sprite("tiles", { frame: 2 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        // Aerial block
        "+": () => [
          K.sprite("tiles", { frame: 3 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],

        // Small bush
        a: () => [K.sprite("tiles", { frame: 48 }), "tiles"],
        b: () => [K.sprite("tiles", { frame: 49 }), "tiles"],
        c: () => [K.sprite("tiles", { frame: 50 }), "tiles"],

        // Pipe
        x: () => [
          K.sprite("pipe", { frame: 0 }), // top half
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        y: () => [
          K.sprite("pipe", { frame: 1 }), // bottom half
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],

        // Clouds - to add the whole cloud you need to put out ^^ in the layout
        "^": () => [K.sprite("cloud"), "cloud"],

        "<": () => [
          K.sprite("prize"),
          K.area(),
          K.body({ isStatic: true }),
          "prize",
        ],
      },
    });
    this.homingEnemyLoop = homingEnemyLoop;
    this.enemyLoop = enemyLoop;
    this.level = K.add([logPlayerPosition(this, player)]);
    this.player = player;
  }

  activateBoss() {
    this.bossActive = true;
    if (this.enemyLoop) {
      this.enemyLoop.cancel();
    }

    const boss = new Boss(this.player, this.homingEnemyLoop);
  }
}

function logPlayerPosition(level, player) {
  return {
    add() {},
    update() {
      if (player.sprite.pos.x > 900 && !level.bossActive) {
        level.activateBoss();
      }
    },
  };
}

export class Level2 {
  constructor() {
    K.loadSprite("tiles", marioTileset, { sliceX: 8, sliceY: 8 });
    K.loadSprite("mario", mario, { sliceX: 1, sliceY: 2 });
    K.loadSprite("cloud", cloud);
    K.loadSprite("pipe", pipe, { sliceX: 1, sliceY: 2 });
    K.loadSprite("castle", castle, { sliceX: 4, sliceY: 4 });
    K.loadSprite("hill", hill, { sliceX: 4, sliceY: 2 });

    K.addLevel(level2, {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        // Ground tile
        "=": () => [
          K.sprite("tiles", { frame: 2 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],
        // Aerial block
        "+": () => [
          K.sprite("tiles", { frame: 3 }),
          K.area(),
          K.body({ isStatic: true }),
          "tiles",
        ],

        // Small bush
        a: () => [K.sprite("tiles", { frame: 48 }), "tiles"],
        b: () => [K.sprite("tiles", { frame: 49 }), "tiles"],
        c: () => [K.sprite("tiles", { frame: 50 }), "tiles"],

        // Clouds - to add the whole cloud you need to put out ^^ in the layout
        "^": () => [K.sprite("cloud"), "cloud"],

        // Super Mario

        "^": () => [K.sprite("cloud"), "cloud"],
        "<": () => [
          K.sprite("mario", { frame: 0 }), // top half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],
        ">": () => [
          K.sprite("mario", { frame: 1 }), // bottom half
          K.scale(1),
          K.area(),
          K.body({ isStatic: true }),
          "mario",
        ],

        // Pipe
        x: () => [
          K.sprite("pipe", { frame: 0 }), // top half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],
        y: () => [
          K.sprite("pipe", { frame: 1 }), // bottom half
          K.area(),
          K.body({ isStatic: true }),
          "pipe",
        ],

        // Castle
        A: () => [K.sprite("castle", { frame: 0 })], // Top-left corner
        B: () => [K.sprite("castle", { frame: 1 })], // Top-second from left
        C: () => [K.sprite("castle", { frame: 2 })], // Top-third from left
        D: () => [K.sprite("castle", { frame: 3 })], // Top-right corner

        E: () => [K.sprite("castle", { frame: 4 })], // Second row - left
        F: () => [K.sprite("castle", { frame: 5 })], // Second row - second from left
        G: () => [K.sprite("castle", { frame: 6 })], // Second row - third from left
        H: () => [K.sprite("castle", { frame: 7 })], // Second row - right

        I: () => [K.sprite("castle", { frame: 8 })], // Third row - left
        J: () => [K.sprite("castle", { frame: 9 })], // Third row - second from left
        K: () => [K.sprite("castle", { frame: 10 })], // Third row - third from left
        L: () => [K.sprite("castle", { frame: 11 })], // Third row - right

        M: () => [K.sprite("castle", { frame: 12 })], // Bottom row - left
        N: () => [K.sprite("castle", { frame: 13 })], // Bottom row - second from left
        O: () => [K.sprite("castle", { frame: 14 })], // Bottom row - third from left
        P: () => [K.sprite("castle", { frame: 15 })], // Bottom row - right

        // Hill
        Q: () => [K.sprite("hill", { frame: 0 })],  // Top-left corner
        R: () => [K.sprite("hill", { frame: 1 })],  // Top-second from left
        S: () => [K.sprite("hill", { frame: 2 })],  // Top-third from left
        T: () => [K.sprite("hill", { frame: 3 })],  // Top-right corner

        U: () => [K.sprite("hill", { frame: 4 })],  // Bottom row - left
        V: () => [K.sprite("hill", { frame: 5 })],  // Bottom row - second from left
        W: () => [K.sprite("hill", { frame: 6 })],  // Bottom row - third from left
        X: () => [K.sprite("hill", { frame: 7 })],  // Bottom row - right
      },
    });
  }
}
