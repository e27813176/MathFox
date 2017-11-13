import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    let FoxVendor = game.add.sprite(0, 0, 'FoxVendor');
    this.animate = createAnimate(FoxVendor, 'FoxVendor', 0, 10, 30, true);
    this.animate.play();
  }
}
