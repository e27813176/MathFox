export default class {
  constructor(game) {
    this.game = game;
    this.Icon = game.add.sprite(100, 100, 'BackPackIcon');
    this.Icon.fixedToCamera = true;
  }
}
