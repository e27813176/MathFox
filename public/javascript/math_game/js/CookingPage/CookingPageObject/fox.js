import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    let FoxAnimate = [
      'Sitting',
      'Throwing',
      'Burning',
      'GetFish',
      'StartCooking',
      'Waiting',
      'Holding',
      'Wrong'
    ];
    let startframe = [18, 0, 33, 51, 60, 70, 78, 87];
    let endframe = [32, 17, 50, 59, 68, 77, 86, 96];
    let loop = [true, false, false, false, false, true, true, false];
    this.Fox = FoxAnimate.map((animate, i) => {
      let index = Math.floor(i / 2) + 1;
      let fox = game.add.sprite(0, 0, `fox00${index}`);
      fox.animate = createAnimate(fox, `fox${animate}`, startframe[i], endframe[i], 25, loop[i]);
      return fox;
    });

    this.hoverArea = game.add.graphics();
    this.hoverArea.beginFill(0xffffff);
    this.hoverArea.drawRect(420, 480, 100, 250);
    this.hoverArea.events.onInputDown.add(game.startCooking, game);
    this.hoverArea.inputEnabled = true;
    this.hoverArea.alpha = 0;
  }
  Waiting() {
    this.hoverArea.inputEnabled = true;
    this.Fox.forEach((fox, i) => foxAction(fox, i, 5));
  }
  Sitting() {
    this.Fox.forEach((fox, i) => foxAction(fox, i, 0));
  }
  async Cooking() {
    this.hoverArea.inputEnabled = false;
    this.Fox.forEach((fox, i) => foxAction(fox, i));
    this.Fox[4].alpha = 1;
    let resolve = await Animate(this.Fox[4]);
    return resolve;
  }
  async Throwing() {
    this.Fox[0].alpha = 0;
    this.Fox[0].animate.stop();
    this.Fox[1].alpha = 1;
    let resolve = await Animate(this.Fox[1]);
    return resolve;
  }
  async Throwingfail() {
    this.Fox.forEach((fox, i) => foxAction(fox, i));
    this.Fox[7].alpha = 1;
    let resolve = await Animate(this.Fox[7]);
    return resolve;
  }
  Burned() {
    this.Fox.forEach((fox, i) => foxAction(fox, i, 2));
  }
  GetFish() {
    this.Fox.forEach((fox, i) => foxAction(fox, i, 3));
  }
}
const Animate = fox => {
  return new Promise(resolve => {
    fox.animate.play()
      .onComplete.add(resolve);
  })
}
const foxAction = (fox, i, index) => {
  if (i === index) {
    fox.alpha = 1;
    fox.animate.play();
  } else {
    fox.alpha = 0;
    fox.animate.stop();
  }
}
