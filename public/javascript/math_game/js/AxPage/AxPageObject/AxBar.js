export default class {
  constructor(game, AxBarX, AxBarLevel2X) {
    this.AxBar = {
      BarBG: game.add.sprite(100, 0, 'AxBar', 'AxBarBG.png'),
      SharpenBar: game.add.sprite(AxBarX, 0, 'AxBar', 'AxBarSharp.png'),
      SharpenBar2: game.add.sprite(AxBarLevel2X, 0, 'AxBar', 'AxBarSharpLevel2.png'),
      Bar: game.add.sprite(100, 0, 'AxBar', 'AxBar.png'),
      BarLight: game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png'),
      LightLevel1: game.add.sprite(100, 0, 'AxBar', 'AxBarLight.png'),
      Energy: game.add.sprite(100, 0, 'AxBar', 'AxBarEnergy.png'),
      LightLevel2: game.add.sprite(100, 0, 'AxBar', 'AxBarLightFull.png')
    }
    for (let obj in this.AxBar) {
      this.AxBar[obj].alpha = 0;
    }
    this.AxBarmask = game.add.graphics();
    this.AxBarmask.beginFill(0xffffff);
    this.AxBarmask.drawRect(250, 70, 350, 50);

    this.AxBar.SharpenBar.mask = this.AxBarmask;
    this.AxBar.SharpenBar2.mask = this.AxBarmask;
  }
  ShowUp() {
    this.AxBar.BarBG.alpha = 1;
    this.AxBar.SharpenBar.alpha = 1;
    this.AxBar.Bar.alpha = 1;
  }
  Clean() {
    for (let obj in this.AxBar) {
      this.AxBar[obj].alpha = 0;
    }
  }
  GetEnergyFx(game) {
    this.AxBar.LightLevel1.alpha = 1;
    game.add.tween(this.AxBar.LightLevel1).to({ alpha: 0 }, 1000, 'Quad.easeOut', true, 0);
    game.add.tween(this.AxBar.SharpenBar).to({ x: '+30' }, 250, 'Quad.easeOut', true, 0);
  }
  GetEnergyFx2(game) {
    game.add.tween(this.AxBar.SharpenBar2).to({ x: '+30' }, 250, 'Quad.easeOut', true, 0);
    game.Audio.AddEnergyFX.play();
    this.AxBar.Energy.alpha = 1;
    game.add.tween(this.AxBar.Energy).to({ alpha: 0 }, 1000, 'Quad.easeOut', true, 0);
  }
  updateAxBar() {
    if (this.AxBar.SharpenBar2.x > -243 && this.AxBar.SharpenBar2.x <= 100) {
      this.AxBar.SharpenBar2.x -= 0.1;
    }
  }
}
