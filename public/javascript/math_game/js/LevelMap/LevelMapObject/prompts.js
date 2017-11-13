import { tweenShining, tweenAlpha, setBtnEnable, delay } from '../../Game/utils';
import { StageState } from '../../User/User'

export default class {
  constructor(game) {
    this.game = game;
    this.GetNewMedalPrompts = [
      game.add.sprite(0, 0, 'GetNewMedal', 'GetNewMedalText.png'),
      game.add.sprite(0, 0, 'GetNewMedal', 'GetNewMedalTextLight.png'),
      game.add.sprite(0, 0, 'GetNewMedal', 'GetNewMedalConfirmBtn.png')
    ]
    tweenShining(this.game, this.GetNewMedalPrompts[1]);
    this.GetNewMedalPrompts.forEach(sprite => {
      sprite.alpha = 0;
      sprite.scale.setTo(0);
    });
    this.GetNewMedalPrompts[0].events.onInputDown.add(this.block, this);
    setBtnEnable(this.GetNewMedalPrompts[0], true);

    this.PromptsConfirmBtn = game.add.sprite(978, 396, 'GetNewMedal', 'GetNewMedalConfirmBtnArea.png');
    this.PromptsConfirmBtn.alpha = 0;
    this.PromptsConfirmBtn.events.onInputDown.add(this.Confirm, this);
  }
  async Confirm() {
    setBtnEnable(this.PromptsConfirmBtn, false);
    this.GetNewMedalPrompts.forEach(sprite => tweenAlpha(this.game, sprite, 0));
    this.GetNewMedalPrompts[1].tween.pause();
    await delay(300);
    this.GetNewMedalPrompts.forEach(sprite => sprite.scale.setTo(0));
  }
  ShowUp() {
    if (StageState.CheckNewMedal === true) {
      StageState.CheckNewMedal = false;
      this.game.Audio.GetMedal.play();
      this.GetNewMedalPrompts.forEach(sprite => { sprite.scale.setTo(1) });
      tweenAlpha(this.game, this.GetNewMedalPrompts[0], 1);
      tweenAlpha(this.game, this.GetNewMedalPrompts[1], 1)
        .onComplete.add(sprite => sprite.tween.resume());
      tweenAlpha(this.game, this.GetNewMedalPrompts[2], 1, 500, 300)
        .onComplete.add(() => setBtnEnable(this.PromptsConfirmBtn, true));
    }
  }
  block() { }
}
