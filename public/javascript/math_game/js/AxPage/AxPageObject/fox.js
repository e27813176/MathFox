import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    this.fox = [
      game.add.sprite(300, 300, 'FoxWithAx001'),
      game.add.sprite(300, 300, 'FoxSitting002'),
      game.add.sprite(300, 300, 'FoxWithAx'),
      game.add.sprite(300, 300, 'FoxWithAx003')
    ]
    createAnimate(this.fox[0], 'FoxWithAx001', 10, 17, 15, true);
    createAnimate(this.fox[1], 'FoxSitting002', 10, 24, 15, true);
    createAnimate(this.fox[2], 'FoxWithAx002', 0, 9, 15, true);
    createAnimate(this.fox[3], 'FoxWithAx003', 0, 9, 17, true);

    this.fox[2].animate.onLoop.add(() => { game.Audio.AxFX.play() });
    this.fox[3].animate.onLoop.add(() => { game.Audio.AxFX.play() });
    this.fox[0].events.onInputDown.add(game.startSharpening, game);
    this.fox[2].events.onInputDown.add(game.stopSharpening, game);
  }
  Sitting(index) {
    this.fox[0].inputEnabled = true;
    this.fox[2].inputEnabled = false;
    this.fox.forEach((sprite, i) => foxAnimate(sprite, i, index));
  }
  Sharpening(index) {
    this.fox[0].inputEnabled = false;
    this.fox[2].inputEnabled = true;
    this.fox.forEach((sprite, i) => foxAnimate(sprite, i, index));
  }
}

const foxAnimate = (sprite, i, index) => {
  if (i === index) {
    sprite.alpha = 1;
    sprite.animate.play();
  } else {
    sprite.alpha = 0;
    sprite.animate.stop();
  }
}
