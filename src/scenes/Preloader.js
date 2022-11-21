import Phaser from "phaser";

export class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.image("tiles", "tilesset/dungeon_tiles.png");
    this.load.tilemapTiledJSON("dungeon", "tilesset/dungeon_lvl01.json");
    this.load.atlas("player", "sprites/player.png", "sprites/player.json");
  }

  create() {
    this.scene.start("MainScene");
  }

  update() {

  }
}
