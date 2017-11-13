import { createAnimate } from '../../Game/utils';
import { FishList } from './fishBox';

export default class {
  constructor(game) {
    let fire = game.add.sprite(0, 0, 'Fish002');
    this.StopFire = createAnimate(fire, 'FireFishStopFire', 20, 34, 30, false);
    this.game = game;
    this.Fish = FishList.map(fish => new Fish(game, fish));
  }
  async PopOut(index) {
    this.Fish[index].alpha = 1;
    await Animate(this.Fish[index].PopOut);
    this.Fish[index].Stop.play();
    if (index === 1) this.StopFire.play();
  }
  Clean() {
    this.Fish.forEach(fish => {
      fish.alpha = 0;
      fish.Stop.stop();
    });
  }
}

class Fish {
  constructor(game, name) {
    let fish = {};
    if (name === 'FireFish' || name === 'MedicineFish' || name === 'WifiFish') fish = game.add.sprite(0, 0, 'Fish002');
    else fish = game.add.sprite(0, 0, 'Fish');
    fish.PopOut = createAnimate(fish, name, 0, 20, 20, false);

    if (name === 'ElectricFish') fish.Stop = createAnimate(fish, `${name}Stop`, 20, 27, 30, true);
    else if (name === 'FireFish') fish.Stop = createAnimate(fish, `${name}Stop`, 20, 27, 30, true);
    else if (name === 'WifiFish') fish.Stop = createAnimate(fish, `${name}Stop`, 20, 35, 30, true);
    else if (name === 'MedicineFish') fish.Stop = createAnimate(fish, `${name}Stop`, 20, 32, 30, true);
    else fish.Stop = createAnimate(fish, `${name}Stop`, 20, 25, 30, true);
    return fish
  }
}
const Animate = animate => {
  return new Promise(resolve => {
    animate.play()
      .onComplete.add(resolve);
  })
}
