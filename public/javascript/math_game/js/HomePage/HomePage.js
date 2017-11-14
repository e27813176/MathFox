import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Fox from './HomeObject/fox';
import ArrowKey from './HomeObject/ArrowKey';

export default class extends Phaser.State {
  init(page) {
    this.fromPage = page;
  }
  create() {
    this.add.sprite(0, 0, 'HomePageBG');
    this.world.setBounds(0, 0, 3200, 800);
    this.Audio = {
      menu: this.add.audio('menu'),
      btnOver: this.add.audio('BtnOver')
    }
    if (this.fromPage === 'loading') {
      this.Audio.menu.loopFull(1);
    }
    let foxPosX = 1200;
    let foxPosY = 0;

    if (this.fromPage === 'Village') {
      foxPosX = 2200;
      foxPosY = 0;
    }
    this.fox = new Fox(this.game, foxPosX, foxPosY);

    this.JunyiIconBtn = this.add.sprite(1300, 700, 'JunyiIconBtn');
    this.JunyiIconBtn.alpha = 1;
    this.JunyiIconBtn.events.onInputDown.add(JunyiIconBtnDown, this);
    setBtnEnable(this.JunyiIconBtn, true)
    this.JunyiIconBtn.fixedToCamera = true;

    this.camera.follow(this.fox.Standing);
    this.camera.deadzone = new Phaser.Rectangle(200, 100, 0, 750);

    this.sunlight001 = this.add.sprite(0, 0, 'sunlight001');
    this.add.tween(this.sunlight001).to({ alpha: 0.4 }, 1500, 'Linear', true, 0, false, true).loop(true);
    this.arrowkey = new ArrowKey(this.game);
    // demo.userPanel.create();
    // demo.backPack.create();
    this.opening();
  }
  opening() {
    this.BG = this.add.graphics();
    this.BG.beginFill(0x000000);
    this.BG.drawRect(0, 0, 3200, 800);
    tweenAlpha(this, this.BG, 0, 1000)
  }
  update() {
    if (this.arrowkey.status === 'left' && this.fox.Standing.x > 305) {
      this.fox.walkingLeft();
    } else if (this.arrowkey.status === 'right') {
      this.fox.walkingRight();
    } else {
      this.fox.standing();
    }
    if (this.fox.Standing.x === 2425 || this.fox.TurnRightWalking.x === 2425 || this.fox.TurnLeftWalking.x === 2425) {
      this.exit();
    }
  }
  exit() {
    this.closing();
  }
  closing() {
    tweenAlpha(this, this.BG, 1, 1000)
      .onComplete.add(() => this.state.start('Village', true, false, 'HomePage'));
  }
}

const JunyiIconBtnDown = () => window.open('https://www.junyiacademy.org/');
const setBtnEnable = (btn, enable) => { btn.inputEnabled = enable };
const tweenAlpha = (game, x, a, duration = 300, delay = 0) => game.add.tween(x).to({ alpha: a }, duration, 'Linear', true, delay);
