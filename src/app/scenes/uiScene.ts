import * as Phaser from "phaser";

import { Joystick } from "../joystick";

export class UiScene extends Phaser.Scene {
  private _joystick: Joystick;

  public constructor() {
    super({
      key: "UiScene",
    });
  }

  // Getter for _lootConfig
  public get joystick(): Joystick {
    return this._joystick;
  }

  public preload(): void {}

  public create(): void {
    this._joystick = new Joystick(this, 30);
    this.add.existing(this._joystick);
  }

  /**
   * This method is called once per game step while the scene is running.
   * Handles the realtime updates.
   * @param {number} time - The current time
   * @param {number} delta - The delta time in ms since the last frame. This is
   * a smoothed and capped value based on the FPS rate.
   */
  public update(time: number, delta: number): void {
    const pointerScreenPos: Phaser.Math.Vector2 = new Phaser.Math.Vector2(
      this.input.activePointer.x,
      this.input.activePointer.y
    );

    this.joystick.updatePosition(pointerScreenPos);
  }
}
