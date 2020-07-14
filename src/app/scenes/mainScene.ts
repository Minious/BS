import * as Phaser from "phaser";

import * as armColtImage from "../../assets/armColt.png";
import * as bodyColtImage from "../../assets/bodyColt.png";
import * as joystickHeadImage from "../../assets/joystickHead.png";
import * as joystickBaseImage from "../../assets/joystickBase.png";

import { Colt } from "../brawlers/colt";

export class MainScene extends Phaser.Scene {
  public constructor() {
    super({
      key: "MainScene",
    });
  }

  public preload(): void {
    this.load.image("armColt", armColtImage.default);
    this.load.image("bodyColt", bodyColtImage.default);
    this.load.image("joystickHead", joystickHeadImage.default);
    this.load.image("joystickBase", joystickBaseImage.default);
  }

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

    this.add.existing(new Colt(this, 0, 0));

    this.scene.launch("UiScene");
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
