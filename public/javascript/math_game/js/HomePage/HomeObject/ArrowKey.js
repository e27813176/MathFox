import { config } from '../../GameConfig';

export default class {
  constructor(game, Fox) {
    this.Fox = Fox;
    let ArrowKey = ArrowKeyDescribe;
    ArrowKey.filter(line => line.version === config.width)
      .forEach(line => {
        this[line.key] = game.add.graphics()
          .beginFill(0xffffff)
          .moveTo(line.p1[0], line.p1[1])
          .lineTo(line.p2[0], line.p2[1])
          .lineTo(line.p3[0], line.p3[1])
          .lineTo(line.p1[0], line.p1[1])
        this[line.key].inputEnabled = true;
        this[line.key].fixedToCamera = true;
      });
    this.right.events.onInputDown.add(this.pressRight, this);
    this.right.events.onInputUp.add(this.stop, this);

    this.left.events.onInputDown.add(this.pressLeft, this);
    this.left.events.onInputUp.add(this.stop, this);
    this.status = 'stop';
  }
  pressRight() {
    this.status = 'right';
    this.Fox.WalkingRight.play();
  }
  pressLeft() {
    this.status = 'left';
    this.Fox.WalkingLeft.play();
  }
  stop() {
    this.status = 'stop';
    this.Fox.Standing.play();
  }
}

const ArrowKeyDescribe = [
  { 'key': 'right', 'p1': [210, 700], 'p2': [280, 740], 'p3': [210, 780], 'version': 1600 },
  { 'key': 'left', 'p1': [150, 700], 'p2': [80, 740], 'p3': [150, 780], 'version': 1600 },
  { 'key': 'right', 'p1': [190, 520], 'p2': [240, 550], 'p3': [190, 580], 'version': 1200 },
  { 'key': 'left', 'p1': [140, 520], 'p2': [90, 550], 'p3': [140, 580], 'version': 1200 }
]
