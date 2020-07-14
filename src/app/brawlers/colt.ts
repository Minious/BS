import * as Phaser from "phaser";

export class Colt extends Phaser.GameObjects.Container {
  public constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    let rightArmImage: Phaser.GameObjects.Image = this.scene.add.image(
      0,
      0,
      "armColtImage"
    );
    this.add(rightArmImage);
    let leftArmImage: Phaser.GameObjects.Image = this.scene.add.image(
      0,
      0,
      "armColtImage"
    );
    leftArmImage.flipX = true;
    this.add(leftArmImage);
    let headArmImage: Phaser.GameObjects.Image = this.scene.add.image(
      0,
      0,
      "bodyColtImage"
    );
    this.add(headArmImage);
  }
}
