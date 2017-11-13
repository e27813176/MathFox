import { createAnimate } from '../../Game/utils';

export default class {
  constructor(game) {
    this.FoxSittingRod = game.add.sprite(0, 0, 'FoxSittingRod');
    createAnimate(this.FoxSittingRod, 'FoxSittingRod', 11, 27, 20, true);

    this.FoxSitting = game.add.sprite(0, 0, 'FoxSitting');
    createAnimate(this.FoxSitting, 'FoxSitting', 11, 27, 20, true);

    this.FoxPullingRod = game.add.sprite(0, 0, 'FoxPullingRod');
    createAnimate(this.FoxPullingRod, 'FoxPullingRod', 0, 18, 30, true);

    this.FoxPulling = game.add.sprite(0, 0, 'FoxPulling');
    createAnimate(this.FoxPulling, 'FoxPulling', 0, 18, 30, true);

    this.FoxFallingRod = game.add.sprite(0, 0, 'FoxFalling');
    createAnimate(this.FoxFallingRod, 'FoxFallingRod', 0, 20, 25, false);

    this.FoxFalling = game.add.sprite(0, 0, 'FoxFalling');
    createAnimate(this.FoxFalling, 'FoxFalling', 0, 20, 25, false);

    this.FoxGetFishRod = game.add.sprite(0, 0, 'FoxGetFish');
    createAnimate(this.FoxGetFishRod, 'FoxGetFishRod', 0, 20, 20, false);

    this.FoxGetFish = game.add.sprite(0, 0, 'FoxGetFish');
    createAnimate(this.FoxGetFish, 'FoxGetFish', 0, 20, 20, false);

    this.FoxSittingRod.animate.play();
    this.FoxSitting.animate.play();
    this.FoxPullingRod.alpha = 0;
    this.FoxPulling.alpha = 0;
    this.FoxFallingRod.alpha = 0;
    this.FoxFalling.alpha = 0;
    this.FoxGetFishRod.alpha = 0;
    this.FoxGetFish.alpha = 0;
  }
  Sitting() {
    this.FoxFalling.alpha = 0;
    this.FoxGetFish.alpha = 0;
    this.FoxGetFishRod.alpha = 0;

    this.FoxSitting.alpha = 1;
    this.FoxSittingRod.alpha = 1;
    this.FoxSitting.animate.play();
    this.FoxSittingRod.animate.play();
  }
  Pulling() {
    this.FoxSitting.alpha = 0;
    this.FoxSittingRod.alpha = 0;
    this.FoxSitting.animate.stop();
    this.FoxSittingRod.animate.stop();

    this.FoxPullingRod.animate.play();
    this.FoxPullingRod.alpha = 1;
    this.FoxPulling.animate.play();
    this.FoxPulling.alpha = 1;
  }
  Fall() {
    this.FoxPulling.alpha = 0;
    this.FoxPullingRod.alpha = 0;
    this.FoxPulling.animate.stop();
    this.FoxPullingRod.animate.stop();

    this.FoxFalling.animate.play();
    this.FoxFalling.alpha = 1;
    this.FoxFallingRod.animate.play();
    this.FoxFallingRod.alpha = 1;
  }
  GetFish() {
    this.FoxPulling.alpha = 0;
    this.FoxPullingRod.alpha = 0;
    this.FoxPulling.animate.stop();
    this.FoxPullingRod.animate.stop();

    this.FoxGetFish.animate.play();
    this.FoxGetFish.alpha = 1;
    this.FoxGetFishRod.animate.play();
    this.FoxGetFishRod.alpha = 1;
  }
}
