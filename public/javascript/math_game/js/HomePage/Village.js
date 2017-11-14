import Phaser from 'phaser';
import Fox from './HomeObject/fox';
import ArrowKey from './HomeObject/ArrowKey';
import TaskBoard from './HomeObject/taskBoard';
import ArrowSheet from './HomeObject/arrow';
import FoxVendor from './HomeObject/vendor';

export default class extends Phaser.State {
  init(page) {
    this.page = page;
  }
  create() {
    this.world.setBounds(0, 0, 3200, 800);
    this.VillageBG = this.add.sprite(0, 0, 'VillageBG');

    let foxPosX, foxPosY;
    if (this.page === 'HomePage') {
      foxPosX = -100;
      foxPosY = 70;
    }
    this.ArrowSheet = new ArrowSheet(this, 735, -40);
    this.FoxVendor = new FoxVendor(this);
    this.fox = new Fox(this.game, foxPosX, foxPosY);

    this.camera.follow(this.fox.Standing);
    this.camera.deadzone = new Phaser.Rectangle(0, 100, 0, 750);

    this.taskBoard = new TaskBoard(this.game);
    this.taskBoard.hover.events.onInputUp.add(this.openTask, this);
    this.arrowkey = new ArrowKey(this.game);
    // demo.userPanel.create();
    // demo.backPack.create();
    this.opening();
  }
  update() {
    if ((this.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.arrowkey.status === 'left')) {
      this.fox.walkingLeft();
    } else if ((this.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.arrowkey.status === 'right') && this.fox.Standing.x < 2460) {
      this.fox.walkingRight();
    } else {
      this.fox.standing();
    }
    if (this.fox.Standing.x === -400 || this.fox.TurnRightWalking.x === -400 || this.fox.TurnLeftWalking.x === -400) {
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
