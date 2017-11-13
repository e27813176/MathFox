export default class {
  constructor(game) {
    this.hover = game.add.graphics();
    this.hover.beginFill(0x000000);
    this.hover.drawRect(1440, 470, 200, 130);
    this.hover.alpha = 0;
    this.hover.inputEnabled = true;
  }
}
