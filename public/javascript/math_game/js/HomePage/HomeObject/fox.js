import Phaser from 'phaser';

export default class {
  constructor(game, posX, posY) {
    let FoxPsoY = posY;
    let FoxPsoX = posX;
    this.Standing = game.add.sprite(FoxPsoX, FoxPsoY, 'FoxAnimate');
    this.StandingAnimate = this.Standing.animations.add('FoxStanding', Phaser.Animation.generateFrameNames('FoxStanding_', 0, 11, '.png', 5), 20, true);
    this.Standing.alpha = 1;
    this.StandingAnimate.play();
    this.TurnLeftStanding = game.add.sprite(FoxPsoX, FoxPsoY, 'FoxAnimate');
    this.TurnLeftStandingAnimate = this.TurnLeftStanding.animations.add('FoxTurnLeftStanding', Phaser.Animation.generateFrameNames('FoxTurnLeftStanding_', 0, 11, '.png', 5), 10, true);
    this.TurnLeftStanding.alpha = 0;
    this.TurnLeftWalking = game.add.sprite(FoxPsoX, FoxPsoY, 'FoxAnimate');
    this.TurnLeftWalkingAnimate = this.TurnLeftWalking.animations.add('FoxTurnLeftWalking', Phaser.Animation.generateFrameNames('FoxWalkingLeft_', 12, 18, '.png', 5), 10, true);
    this.TurnLeftWalking.alpha = 0;
    this.TurnRightStanding = game.add.sprite(FoxPsoX, FoxPsoY, 'FoxAnimate');
    this.TurnRightStandingAnimate = this.TurnRightStanding.animations.add('FoxTurnRightStanding', Phaser.Animation.generateFrameNames('FoxTurnRightStanding_', 0, 11, '.png', 5), 10, true);
    this.TurnRightStanding.alpha = 0;
    this.TurnRightWalking = game.add.sprite(FoxPsoX, FoxPsoY, 'FoxAnimate');
    this.TurnRightWalkingAnimate = this.TurnRightWalking.animations.add('FoxTurnRightWalking', Phaser.Animation.generateFrameNames('FoxWalkingRight_', 12, 18, '.png', 5), 10, true);
    this.TurnRightWalking.alpha = 0;
  }
  walkingRight() {
    let speed = 5;
    this.Standing.x += speed;
    this.TurnRightWalking.x += speed;
    this.TurnLeftWalking.x += speed;
    this.StandingAnimate.stop();
    this.Standing.alpha = 0;
    this.TurnLeftWalkingAnimate.stop();
    this.TurnLeftWalking.alpha = 0;
    this.TurnRightWalking.animations.play('FoxTurnRightWalking', 15, true);
    this.TurnRightWalking.alpha = 1;
  }
  walkingLeft() {
    let speed = 5;
    this.Standing.x -= speed;
    this.TurnRightWalking.x -= speed;
    this.TurnLeftWalking.x -= speed;
    this.StandingAnimate.stop();
    this.Standing.alpha = 0;
    this.TurnRightWalkingAnimate.stop();
    this.TurnRightWalking.alpha = 0;
    this.TurnLeftWalking.animations.play('FoxTurnLeftWalking', 15, true);
    this.TurnLeftWalking.alpha = 1;
  }
  standing() {
    this.Standing.animations.play('FoxStanding', 10, true);
    this.Standing.alpha = 1;
    this.TurnLeftWalkingAnimate.stop();
    this.TurnLeftWalking.alpha = 0;
    this.TurnRightWalkingAnimate.stop();
    this.TurnRightWalking.alpha = 0;
  }
}
