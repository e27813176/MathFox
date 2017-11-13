import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class extends Phaser.State {
  init(page) {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.page = page;
  }
  preload() {
    let path = path_prefix + 'assets/loadingpage/';
    this.load.image('FoxLogo', path + 'LOGO.jpg');
    this.load.image('LoadingBar', path + 'LoadingBar.jpg');
    this.load.image('LoadingBarFrame', path + 'LoadingBarFrame.png');
  }
  create() {
    this.stage.backgroundColor = '#000000';
    this.state.start('Preload', true, false, this.page);
  }
}
