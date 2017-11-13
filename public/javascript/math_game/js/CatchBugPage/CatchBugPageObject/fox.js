import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    this.fox = {
      standing: game.add.sprite(0, 0, 'FoxStanding'),
      falling: game.add.sprite(0, 0, 'FoxFalling'),
      hitting001: game.add.sprite(0, 0, 'FoxHitting001'),
      hitting: game.add.sprite(0, 0, 'FoxHitting'),
      standUp: game.add.sprite(0, 0, 'FoxStandUp'),
      catching: game.add.sprite(0, 0, 'FoxCatching'),
      fruitDrop: game.add.sprite(0, 0, 'FruitDrop')
    }

    createAnimate(this.fox.standing, 'FoxStanding', 11, 40, 30, true);
    createAnimate(this.fox.falling, 'FoxFalling', 41, 57, 30, false);
    createAnimate(this.fox.hitting001, 'FoxHitting', 58, 70, 30, false);
    createAnimate(this.fox.hitting, 'FoxHitting', 71, 106, 30, false);
    createAnimate(this.fox.standUp, 'FoxStandUp', 101, 145, 30, false);
    createAnimate(this.fox.catching, 'FoxCatching', 0, 10, 30, false);
    createAnimate(this.fox.fruitDrop, 'FruitDrop', 59, 96, 30, false);

    for (let obj in this.fox) {
      this.fox[obj].alpha = 0;
    }
  }
  Standing() {
    this.fox.standUp.alpha = 0;
    this.fox.falling.alpha = 0;
    this.fox.catching.alpha = 0;

    this.fox.standing.alpha = 1;
    this.fox.standing.animate.play('FoxStanding');
  }
  async Catch() {
    this.fox.standing.alpha = 0;
    this.fox.standing.animate.stop();
    let resolve = await Animate(this.fox.catching);
    return resolve;
  }
  async Uncatch() {
    this.fox.standing.alpha = 0;
    this.fox.standing.animate.stop();
    let resolve = await Animate(this.fox.falling);
    return resolve;
  }
  async Fail() {
    this.fox.standing.alpha = 0;
    this.fox.standing.animate.stop();
    this.fox.fruitDrop.alpha = 1;
    this.fox.fruitDrop.animate.play('FruitDrop');
    await Animate(this.fox.hitting001);
    this.fox.hitting001.alpha = 0;
    await Animate(this.fox.hitting);
    this.fox.hitting.alpha = 0;
    let resolve = await Animate(this.fox.standUp);
    return resolve;
  }
}

const Animate = fox => {
  fox.alpha = 1;
  return new Promise(resolve =>
    fox.animate.play()
      .onComplete.add(resolve)
  )
}
