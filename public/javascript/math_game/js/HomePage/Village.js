import Phaser from 'phaser';
import Fox from './HomeObject/fox';
import ArrowKey from './HomeObject/ArrowKey';
import TaskBoard from './HomeObject/taskBoard';
import ArrowSheet from './HomeObject/arrow';
import FoxVendor from './HomeObject/vendor';
import { config } from '../GameConfig';

export default class extends Phaser.State {
  init(page) {
    this.page = page;
  }
  create() {
    this.world.setBounds(0, 0, config.width * 2, config.height);
    this.VillageBG = this.add.sprite(0, 0, 'VillageBG');

    let foxPosX, foxPosY;
    if (this.page === 'HomePage') {
      foxPosX = -500;
      foxPosY = 70;
    }
    this.ArrowSheet = new ArrowSheet(this, 735, -40);
    this.FoxVendor = new FoxVendor(this);
    this.Fox = new Fox(this.game, foxPosX, foxPosY);

    this.camera.follow(this.Fox.image);
    this.camera.deadzone = new Phaser.Rectangle(0, 100, 0, 750);
    this.controller();
    this.taskBoard = new TaskBoard(this.game);
    this.taskBoard.hover.events.onInputUp.add(this.openTask, this);
    // demo.userPanel.create();
    // demo.backPack.create();
    this.opening();
  }
  controller() {
    this.Arrowkey = new ArrowKey(this.game, this.Fox);
    this.LeftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.RightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.LeftKey.onDown.add(this.Arrowkey.pressLeft, this.Arrowkey);
    this.RightKey.onDown.add(this.Arrowkey.pressRight, this.Arrowkey);
    this.LeftKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
    this.RightKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
    this.input.enabled = true;
  }
  update() {
    if (this.Arrowkey.status === 'left') {
      this.Fox.image.x -= this.Fox.speed;
    } else if (this.Arrowkey.status === 'right' && this.Fox.image.x < 2460) {
      this.Fox.image.x += this.Fox.speed;
    }
    if (this.Fox.image.x === -600) {
      this.exit('HomePage', false, 'Village');
    }
  }
  openTask() {
    this.exit('GameBoot', true, 'LevelMap');
  }
  exit(page, clean, pram) {
    this.closing(page, clean, pram);
  }
  opening() {
    this.BG = this.add.graphics();
    this.BG.beginFill(0x000000);
    this.BG.drawRect(0, 0, 3200, 800);
    this.add.tween(this.BG).to({ alpha: 0 }, 1000, 'Linear', true, 0);
  }
  closing(page, clean, pram) {
    this.add.tween(this.BG)
      .to({ alpha: 1 }, 1000, 'Linear', true, 0)
      .onComplete.add(() => this.state.start(page, true, clean, pram));
  }
}
