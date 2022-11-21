import Phaser from "phaser";
import { debugGraphics } from "../components/utils.js";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    this.cursors = null;
    /** @type {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody} */
    this.player = null;
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    const map = this.make.tilemap({ key: "dungeon" });
    const tileset = map.addTilesetImage("dungeon", "tiles");
    map.createLayer("ground", tileset);// .setPipeline("Light2D");
    const wallLayer = map.createLayer("walls", tileset);// .setPipeline("Light2D");
    map.createLayer("items", tileset);// .setPipeline("Light2D");

    wallLayer.setCollisionByProperty({ collides: true });

    debugGraphics(wallLayer, this);

    this.player = this.physics.add.sprite(60, 70, "player", "run-down-2.png");
    this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.8);
    this.anims.create({
      key: "PLAYER.iddle-down",
      frames: [{ key: "player", frame: "walk-down-3.png" }]
    });

    this.anims.create({
      key: "PLAYER.run-down",
      frames: this.anims.generateFrameNames("player", { start: 1, end: 8, prefix: "run-down-", suffix: ".png" }),
      repeat: -1,
      frameRate: 15
    });

    this.anims.create({
      key: "PLAYER.run-up",
      frames: this.anims.generateFrameNames("player", { start: 1, end: 8, prefix: "run-up-", suffix: ".png" }),
      repeat: -1,
      frameRate: 15
    });

    this.anims.create({
      key: "PLAYER.run-side",
      frames: this.anims.generateFrameNames("player", { start: 1, end: 8, prefix: "run-side-", suffix: ".png" }),
      repeat: -1,
      frameRate: 15
    });
    this.physics.add.collider(this.player, wallLayer);
    this.cameras.main.startFollow(this.player, true);
  }

  /**
   * Updates loop
   *
   * @param {integer} time
   * @param {integer} delta
   * @returns
   */
  update(time, delta) {
    const speed = 100;
    if (!this.cursors || !this.player) return;
    if (this.cursors.left.isDown) {
      this.player.anims.play("PLAYER.run-side", true);
      this.player.setVelocity(-speed, 0);
      this.player.scaleX = -1;
      this.player.body.offset.x = 24;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("PLAYER.run-side", true);
      this.player.setVelocity(speed, 0);
      this.player.scaleX = 1;
      this.player.body.offset.x = 8;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("PLAYER.run-up", true);
      this.player.setVelocity(0, -speed);
      this.player.scaleX = 1;
      this.player.body.offset.x = 8;
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("PLAYER.run-down", true);
      this.player.setVelocity(0, speed);
      this.player.scaleX = 1;
      this.player.body.offset.x = 8;
    } else {
      this.player.anims.play("PLAYER.iddle-down", true);
      this.player.setVelocity(0, 0);
    }
  }
}
