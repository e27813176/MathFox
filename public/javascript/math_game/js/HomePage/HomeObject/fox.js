import { createAnimate } from '../../Game/utils';
import { config } from '../../GameConfig';

export default class {
  constructor(game, posX, posY) {
    this.image = game.add.sprite(posX, posY, 'Fox');
    let foxAnimateData;
    if (config.width === 1600) {
      foxAnimateData = foxAnimate1600;
      this.speed = 5;
    } else if (config.width === 1200) {
      foxAnimateData = foxAnimate1200;
      this.speed = 4;
    }
    foxAnimateData.forEach(line => {
      this[line.key] = createAnimate(this.image, line.frameName, 0, 0 + line.frames, line.frameRate, true)
    });
    this.Standing.play();
  }
}

const foxAnimate1600 = [
  { 'key': 'Standing', 'frameName': 'FoxStanding', 'frames': 9, 'frameRate': 10 },
  { 'key': 'WalkingLeft', 'frameName': 'FoxWalkingLeft', 'frames': 5, 'frameRate': 15 },
  { 'key': 'WalkingRight', 'frameName': 'FoxWalkingRight', 'frames': 5, 'frameRate': 15 }
];

const foxAnimate1200 = [
  { 'key': 'Standing', 'frameName': 'FoxStanding', 'frames': 9, 'frameRate': 10 },
  { 'key': 'WalkingLeft', 'frameName': 'FoxTurnLeft', 'frames': 6, 'frameRate': 15 },
  { 'key': 'WalkingRight', 'frameName': 'FoxTurnRight', 'frames': 6, 'frameRate': 15 }
];
