import * as Phaser from "phaser";

import { Brawler } from "./brawler";

export class Colt extends Brawler {
  public constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 100);

    let rightArmImage: Phaser.GameObjects.Image = this.scene.add.image(
      0,
      0,
      "armColt"
    );
    this.add(rightArmImage);
    let leftArmImage: Phaser.GameObjects.Image = this.scene.add.image(
      0,
      0,
      "armColt"
    );
    leftArmImage.flipX = true;
    this.add(leftArmImage);
    let headArmImage: Phaser.GameObjects.Image = this.scene.add.image(
      0,
      0,
      "bodyColt"
    );
    this.add(headArmImage);

    this.setScale(0.5, 0.5);
  }
}
