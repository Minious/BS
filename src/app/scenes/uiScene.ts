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

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer): void => {
      this.joystick.resetTo(pointer.position);
      this.joystick.show();
    });

    this.input.on("pointerup", (): void => {
      this.joystick.hide();
    });
  }

  /**
   * This method is called once per game step while the scene is running.
   * Handles the realtime updates.
   * @param {number} time - The current time
   * @param {number} delta - The delta time in ms since the last frame. This is
   * a smoothed and capped value based on the FPS rate.
   */
  public update(time: number, delta: number): void {
    this.joystick.updatePosition(this.input.activePointer.position);
  }
}
