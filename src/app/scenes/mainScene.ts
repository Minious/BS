import * as Phaser from "phaser";

export class MainScene extends Phaser.Scene {
  public constructor() {
    super(
      {
        key: "WorldScene",
      }
    );
  }

  // tslint:disable-next-line: no-empty
  public preload(): void {}

  public create(): void {
    // Disables right click
    this.game.canvas.oncontextmenu = (e: MouseEvent): void => {
      e.preventDefault();
    };

    /**
     * Places the camera centered to the origin (default is left upper corner is
     * at origin)
     */
    this.cameras.main.centerOn(0, 0);
  }

  /**
   * This method is called once per game step while the scene is running.
   * Handles the realtime updates.
   * @param {number} time - The current time
   * @param {number} delta - The delta time in ms since the last frame. This is
   * a smoothed and capped value based on the FPS rate.
   */
  // tslint:disable-next-line: no-empty
  public update(time: number, delta: number): void {}
}
