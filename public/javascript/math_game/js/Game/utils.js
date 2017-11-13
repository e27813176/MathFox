import Phaser from 'phaser';

export const createAnimate = (name, string, startframe, endframe, frameRate, loop) => {
  name.animate = name.animations.add(string, Phaser.Animation.generateFrameNames(string + '_', startframe, endframe, '.png', 5), frameRate, loop);
  return name.animate
};

export class Timer {
  constructor() {
    this.time = 0;
  }
  start() {
    let callback = this.update.bind(this);
    this.time = 0;
    this.count = setInterval(callback, 1000);
  }
  update() {
    this.time++;
  }
  stop() {
    clearInterval(this.count);
    return this.time;
  }
}

export const tweenShining = (game, obj) => {
  obj.alpha = 1;
  obj.tween = game.add.tween(obj).to({ alpha: '-0.5' }, 500, 'Quad.easeInOut', true, 0, false, true).loop(true);
  obj.tween.pause();
  obj.alpha = 0;
}

export const tweenAlpha = (game, x, a, duration = 300, delay = 0) => game.add.tween(x).to({ alpha: a }, duration, 'Linear', true, delay)

export const audioMute = (game, audio) => {
  game.add.tween(audio)
    .to({ volume: 0 }, 500, 'Linear', true, 0)
    .onComplete.add(x => x.stop());
}

export const setBtnEnable = (btn, enable) => { btn.inputEnabled = enable };
export const delay = timeout => new Promise(resolve => {
  setTimeout(resolve, timeout)
});
