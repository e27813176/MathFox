import 'pixi';
import 'p2';
import Phaser from 'phaser';
import Fox from './HomeObject/fox';
import ArrowKey from './HomeObject/ArrowKey';
import { config } from '../GameConfig';
import { tweenAlpha, setBtnEnable } from '../Game/utils';

export default class extends Phaser.State {
  init(page) {
    let width = config.width;
    this.fromPage = page;
    this.foxPos = foxPosition(this.fromPage, width);
    this.JunyiIconPos = JunyiIconPosition(width);
    this.exitPointX = exitPosition(width);
  }
  create() {
    this.createImage();
    this.createAudio();
    this.world.setBounds(0, 0, config.width * 2, config.height);
    if (this.fromPage === 'loading') {
      this.Audio.menu.loopFull(1);
    }
    this.controller();
    this.createBtn();
    setBtnEnable(this.JunyiIconBtn, true);
    this.camera.follow(this.Fox.image);
    this.camera.deadzone = new Phaser.Rectangle(0, 100, 0, 0);
    this.opening();
  }
  createImage() {
    this.add.sprite(0, 0, 'HomePageBG');
    this.Fox = new Fox(this, this.foxPos[0], this.foxPos[1]);
    this.Fox.Standing.play();
  }
  createBtn() {
    this.JunyiIconBtn = this.add.sprite(this.JunyiIconPos[0], this.JunyiIconPos[1], 'JunyiIconBtn');
    this.JunyiIconBtn.alpha = 1;
    this.JunyiIconBtn.events.onInputDown.add(JunyiIconBtnDown, this);
    this.JunyiIconBtn.fixedToCamera = true;
  }
  controller() {
    this.Arrowkey = new ArrowKey(this, this.Fox);
    this.LeftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.RightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.LeftKey.onDown.add(this.Arrowkey.pressLeft, this.Arrowkey);
    this.RightKey.onDown.add(this.Arrowkey.pressRight, this.Arrowkey);
    this.LeftKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
    this.RightKey.onUp.add(this.Arrowkey.stop, this.Arrowkey);
    this.input.enabled = true;
  }
  createAudio() {
    this.Audio = {
      menu: this.add.audio('menu'),
      btnOver: this.add.audio('BtnOver')
    }
  }
  opening() {
    this.BG = this.add.graphics();
    this.BG.beginFill(0x000000);
    this.BG.drawRect(0, 0, config.width * 2, config.height);
    tweenAlpha(this, this.BG, 0, 1000);
  }
  update() {
    if (this.Arrowkey.status === 'left' && this.Fox.image.x > 305) {
      this.Fox.image.x -= this.Fox.speed;
    } else if (this.Arrowkey.status === 'right') {
      this.Fox.image.x += this.Fox.speed;
    }
    if (this.Fox.image.x === this.exitPointX) {
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

const foxPosition = (page, width) => {
  let foxPosX;
  let foxPosY;
  if (width === 1600) {
    if (page === 'Village') {
      foxPosX = 2200;
      foxPosY = 10;
    } else {
      foxPosX = 900;
      foxPosY = 10;
    }
  } else if (width === 1200) {
    if (page === 'Village') {
      foxPosX = 1700;
      foxPosY = 8;
    } else {
      foxPosX = 600;
      foxPosY = 8;
    }
  }
  return [foxPosX, foxPosY]
}

const JunyiIconPosition = width => {
  if (width === 1600) {
    return [1300, 700];
  } else if (width === 1200) {
    return [950, 530];
  }
}

const exitPosition = width => {
  if (width === 1600) {
    return 2265;
  } else if (width === 1200) {
    return 1720;
  }
}
