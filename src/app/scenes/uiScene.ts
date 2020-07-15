import * as Phaser from "phaser";

import { Joystick } from "../joystick";
import { MainScene } from "./mainScene";

export class UiScene extends Phaser.Scene {
  private _moveJoystick: Joystick;
  private _attackJoystick: Joystick;

  public constructor() {
    super({
      key: "UiScene",
    });
  }

  // Getter for _moveJoystick
  public get moveJoystick(): Joystick {
    return this._moveJoystick;
  }

  // Getter for _attackJoystick
  public get attackJoystick(): Joystick {
    return this._attackJoystick;
  }

  public preload(): void {}

  public create(): void {
    const marginJoysticks: number = 100;
    this._moveJoystick = new Joystick(
      this,
      30,
      new Phaser.Math.Vector2(
        marginJoysticks,
        this.cameras.main.height - marginJoysticks
      )
    );
    this.add.existing(this._moveJoystick);

    this._attackJoystick = new Joystick(
      this,
      30,
      new Phaser.Math.Vector2(
        this.cameras.main.width - marginJoysticks,
        this.cameras.main.height - marginJoysticks
      ),
      (joystick: Joystick) => {
        const mainScene: MainScene = this.scene.manager.getScene(
          "MainScene"
        ) as MainScene;
        mainScene.brawlerAttack(joystick.getMove());
      }
    );
    this.add.existing(this._attackJoystick);

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer): void => {
      if (
        !this._moveJoystick.inUse &&
        pointer.x < this.cameras.main.width / 2
      ) {
        this._moveJoystick.start(pointer);
      } else if (
        !this._attackJoystick.inUse &&
        pointer.x >= this.cameras.main.width / 2
      ) {
        this._attackJoystick.start(pointer);
      }
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
    this._moveJoystick.update();
    this._attackJoystick.update();
  }
}
