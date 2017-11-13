export default class {
  constructor(game) {
    let posX = 200;
    let posY = 700;
    this.right = game.add.graphics();
    this.right.beginFill(0xffffff);
    this.right.moveTo(posX + 10, posY);
    this.right.lineTo(posX + 70 + 10, posY + 40);
    this.right.lineTo(posX + 10, posY + 80);
    this.right.lineTo(posX + 10, posY);

    this.right.inputEnabled = true;
    this.right.events.onInputDown.add(this.pressRight, this);
    this.right.events.onInputUp.add(this.stop, this);
    this.right.fixedToCamera = true;

    this.left = game.add.graphics();
    this.left.beginFill(0xffffff);
    this.left.moveTo(posX - 50, posY);
    this.left.lineTo(posX - 70 - 50, posY + 40);
    this.left.lineTo(posX - 50, posY + 80);
    this.left.lineTo(posX - 50, posY);

    this.left.inputEnabled = true;
    this.left.events.onInputDown.add(this.pressLeft, this);
    this.left.events.onInputUp.add(this.stop, this);

    this.left.fixedToCamera = true;
    this.status = 'stop';
  }
  pressRight() {
    this.status = 'right';
  }
  pressLeft() {
    this.status = 'left';
  }
  stop() {
    this.status = 'stop';
  }
}
