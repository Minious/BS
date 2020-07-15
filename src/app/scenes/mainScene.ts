import * as Phaser from "phaser";

import * as armColtImage from "../../assets/armColt.png";
import * as bodyColtImage from "../../assets/bodyColt.png";
import * as joystickHeadImage from "../../assets/joystickHead.png";
import * as joystickBaseImage from "../../assets/joystickBase.png";

import { Brawler } from "../brawlers/brawler";
import { Colt } from "../brawlers/colt";
import { UiScene } from "./uiScene";

export class MainScene extends Phaser.Scene {
  brawlers: Array<Brawler> = [];

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

    const colt = new Colt(this, 0, 0);
    this.brawlers.push(colt);
    this.brawlers.forEach((brawler: Brawler) => this.add.existing(brawler));

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
  public update(time: number, delta: number): void {
    const uiScene: UiScene = this.scene.manager.getScene("UiScene") as UiScene;
    if (uiScene.moveJoystick.inUse) {
      this.brawlers.forEach((brawler: Brawler) =>
        brawler.move(
          uiScene.moveJoystick.getMove(),
          uiScene.moveJoystick.getRatio(),
          1 / 60
        )
      );
    }
  }

  public brawlerAttack(direction: Phaser.Math.Vector2): void {
    console.log("attack");
  }
}
