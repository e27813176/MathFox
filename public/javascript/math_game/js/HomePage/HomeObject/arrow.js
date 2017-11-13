import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game, posX, posY) {
    let arrow = game.add.sprite(posX, posY, 'ArrowSheet');
    return createAnimate(arrow, 'ArrowSheet', 0, 8, 20, true).play();
  }
}
