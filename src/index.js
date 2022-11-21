import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader.js";
import { MainScene } from "./scenes/MainScene.js";

export default new Phaser.Game({
  type: Phaser.WEBGL,
  width: 400,
  height: 300,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    },

  },
  scene: [Preloader, MainScene],
  scale: {
    zoom: 2
  }
});
