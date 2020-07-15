export abstract class Brawler extends Phaser.GameObjects.Container {
  protected speed: number;

  public constructor(scene: Phaser.Scene, x: number, y: number, speed: number) {
    super(scene, x, y);

    this.speed = speed;
  }

  public move(
    direction: Phaser.Math.Vector2,
    ratio: number,
    deltaTime: number
  ): void {
    const move: Phaser.Math.Vector2 = new Phaser.Math.Vector2(direction)
      .normalize()
      .scale(ratio * this.speed * deltaTime);
    this.x += move.x;
    this.y += move.y;
    this.pointTo(direction);
  }

  public pointTo(direction: Phaser.Math.Vector2) {
    var angle =
      Phaser.Math.RAD_TO_DEG *
      Phaser.Math.Angle.Between(1, 0, direction.x, direction.y);
    this.setAngle(angle - 90);
  }
}
