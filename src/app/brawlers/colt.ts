import * as Phaser from "phaser";

export class Colt extends Phaser.GameObjects.Container {
  public constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

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

    this.scene.input.on(
      "pointermove",
      (pointer: Phaser.Input.Pointer) => {
        var angle =
          Phaser.Math.RAD_TO_DEG *
          Phaser.Math.Angle.Between(
            this.x,
            this.y,
            pointer.worldX,
            pointer.worldY
          );
        this.setAngle(angle - 90);
      },
      this
    );
  }
}
