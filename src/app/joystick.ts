import * as Phaser from "phaser";

/**
 * The Joystick class emulate a virtual joystick. The joystick is composed by a
 * head and a base. It is given a maximum length (distance between head and
 * base). It takes the pointer's screen position as input to update the position
 * the head of the joystick. Then if the base is too far away from the head
 * (head-base distance above the maximum length), the base is moved closer to
 * the head until their distance is equal to the maximum length. The Joystick is
 * a Phaser Container always positionned at the origin and the head and base
 * positionned relatively to the Container. Since its position is (0;0), it
 * simplifies the formulas.
 */
export class Joystick extends Phaser.GameObjects.Container {
  // This object belongs to the UiScene
  public scene: Phaser.Scene;

  // Maximum length between the base and the head of the joystick
  private maxLengthJoystick: number;
  // The joystick's head game object Image
  private joystickHeadImage: Phaser.GameObjects.Image;
  // The joystick's base game object Image
  private joystickBaseImage: Phaser.GameObjects.Image;

  private pointer: Phaser.Input.Pointer;
  private _inUse: boolean = false;
  private callback: (joystick: Joystick) => void;
  private initialPosition: Phaser.Math.Vector2;

  /**
   * Creates the Joystick object.
   * @param {Scene} scene - The Scene this Joystick belongs to
   * (should be UiScene)
   * @param {number} maxLengthJoystick - The maximum distance between the head
   * and the base of the joystick
   */
  public constructor(
    scene: Phaser.Scene,
    maxLengthJoystick: number,
    initialPosition: Phaser.Math.Vector2,
    callback?: (joystick: Joystick) => void
  ) {
    super(scene, 0, 0);

    this.maxLengthJoystick = maxLengthJoystick;
    this.callback = callback;

    this.joystickBaseImage = this.scene.add.image(0, 0, "joystickBase");
    this.joystickBaseImage.name = "joystickBase";
    this.add(this.joystickBaseImage);

    this.joystickHeadImage = this.scene.add.image(0, 0, "joystickHead");
    this.joystickHeadImage.name = "joystickHead";
    this.joystickHeadImage.setInteractive();
    this.add(this.joystickHeadImage);

    this.initialPosition = initialPosition;
    this.resetTo(this.initialPosition);

    this.scene.input.on(
      "pointerup",
      (pointerUp: Phaser.Input.Pointer): void => {
        if (pointerUp === this.pointer) {
          if (this.callback) {
            this.callback(this);
          }
          this.stop();
          this._inUse = false;
        }
      }
    );
  }

  // Getter for _inUse
  public get inUse(): boolean {
    return this._inUse;
  }

  public update(): void {
    if (this.pointer) {
      this.updatePosition(this.pointer.position);
    }
  }

  public start(pointer: Phaser.Input.Pointer): void {
    this.pointer = pointer;
    this.resetTo(this.pointer.position);
    this._inUse = true;
  }

  /**
   * Returns a Vector2 which goes from the base to the head of the Joystick
   * @returns {Vector2} - The Vector2 going from the base to the head of the
   * Joystick
   */
  public getMove(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      this.joystickHeadImage.x,
      this.joystickHeadImage.y
    ).subtract(
      new Phaser.Math.Vector2(
        this.joystickBaseImage.x,
        this.joystickBaseImage.y
      )
    );
  }

  /**
   * Returns the ratio between the current length of the joystick (base to head)
   * to its maximum length. Gives a number between 0 and 1 representing how much
   * the joystick is moved.
   */
  public getRatio(): number {
    const currentLengthJoystick: number = new Phaser.Math.Vector2(
      this.joystickHeadImage.x,
      this.joystickHeadImage.y
    ).distance(
      new Phaser.Math.Vector2(
        this.joystickBaseImage.x,
        this.joystickBaseImage.y
      )
    );
    return Math.max(
      Math.min(currentLengthJoystick / this.maxLengthJoystick, 1),
      0
    );
  }

  /**
   * Resets base and head's position to the same reset position.
   * @param pointerScreenPos - The reset position
   */
  public resetTo(resetPos: Phaser.Math.Vector2): void {
    this.joystickBaseImage.setPosition(resetPos.x, resetPos.y);
    this.joystickHeadImage.setPosition(resetPos.x, resetPos.y);
  }

  /**
   * Updates the position of the head of the joystick by giving the pointer's
   * world position. Moves the base too if it gets too far from the head.
   * @param pointerScreenPos - The position of the pointer in screen coordinates
   */
  private updatePosition(pointerScreenPos: Phaser.Math.Vector2): void {
    this.joystickHeadImage.setPosition(pointerScreenPos.x, pointerScreenPos.y);

    const currentLengthJoystick: number = new Phaser.Math.Vector2(
      this.joystickHeadImage.x,
      this.joystickHeadImage.y
    ).distance(
      new Phaser.Math.Vector2(
        this.joystickBaseImage.x,
        this.joystickBaseImage.y
      )
    );

    /**
     * If the head (pointer) is too far from the base of the joystick, then
     * moves the base towards the head until the distance reaches the
     * maxLengthJoystick
     */
    if (currentLengthJoystick > this.maxLengthJoystick) {
      const newBasePosition: Phaser.Math.Vector2 = new Phaser.Math.Vector2(
        this.joystickBaseImage.x,
        this.joystickBaseImage.y
      )
        .subtract(
          new Phaser.Math.Vector2(
            this.joystickHeadImage.x,
            this.joystickHeadImage.y
          )
        )
        .scale(this.maxLengthJoystick / currentLengthJoystick)
        .add(
          new Phaser.Math.Vector2(
            this.joystickHeadImage.x,
            this.joystickHeadImage.y
          )
        );
      this.joystickBaseImage.setPosition(newBasePosition.x, newBasePosition.y);
    }
  }

  private stop(): void {
    this.pointer = undefined;
    this.resetTo(this.initialPosition);
  }
}
