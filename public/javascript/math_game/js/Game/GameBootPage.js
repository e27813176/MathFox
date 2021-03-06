import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { loadingbarURI, loadingbarFrameURI } from './images/LoadingBarURI';

export default class extends Phaser.State {
  init(page) {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.page = page;
  }
  preload() {
    this.load.image('FoxLogo', require('../../assets/loadingpage/BG.jpg'));
    this.load.image('LoadingBar', loadingbarURI);
    this.load.image('LoadingBarFrame', loadingbarFrameURI);
  }
  create() {
    this.stage.backgroundColor = '#000000';
    this.state.start('Preload', true, false, this.page);
  }
}
