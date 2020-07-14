import * as Phaser from "phaser";

import { MainScene } from "./scenes/mainScene";

export const run = (): void => {
  const scenes: Array<typeof Phaser.Scene> = [MainScene];

  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 700,
    height: 500,
    backgroundColor: "#DDD",
    parent: "game",
    physics: {
      default: "arcade",
    },
    scene: scenes,
  };

  // Creates the Phaser canvas and start the game
  // @ts-ignore: noUnusedLocals error
  const game: Phaser.Game = new Phaser.Game(config);
};
