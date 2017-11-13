import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    let fish = game.add.sprite(0, 0, 'fish');
    fish.throw = createAnimate(fish, 'fish', 0, 17, 25, false);
    fish.burned = createAnimate(fish, 'fishBurned', 33, 50, 35, false);
    fish.alpha = 0;
    return fish;
  }
}
