import 'pixi';
import 'p2';
import Phaser from 'phaser';

export default class extends Phaser.State {
  init(page) {
    this.page = page;
  }
  preload() {
    let centerX = this.game.width / 2;
    let centerY = 800 / 2;
    this.loadingBar = this.add.sprite(centerX - 300, 620, 'LoadingBar');
    this.loadingBar.alpha = 1;
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar, 0);

    this.FoxLogo = this.add.sprite(centerX, centerY, 'FoxLogo');
    this.FoxLogo.anchor.setTo(0.5);
    this.add.tween(this.FoxLogo).to({ alpha: 0.5 }, 800, 'Quad.easeInOut', true, 0, false, true).loop(true);

    this.LoadingBarFrame = this.add.sprite(centerX, 620, 'LoadingBarFrame');
    this.LoadingBarFrame.alpha = 1;
    this.LoadingBarFrame.anchor.setTo(0.5, 0.5);
    if (this.page === 'HomePage') this.HomePageLoad();
    this.loader();
  }
  HomePageLoad() {
    let path = path_prefix + 'assets/HomePage/';
    this.load
      .image('HomePageBG', path + 'BG.jpg')
      .image('FrontBG', path + 'FrontBG.png')
      .image('sunlight001', path + 'sunlight001.png')
      .image('sunlight002', path + 'sunlight002.png')
      .atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json')
      .image('JunyiIconBtn', path + 'JunyiIconBtn.png')
      .atlas('FoxAnimate', path + 'FoxAnimate.png', path + 'FoxAnimate.json')
      .image('UserPanel', path + 'UserPanel.png')
      .image('BackPackIcon', path + 'BackPackIcon.png')
    path = path_prefix + 'assets/audio/';
    this.load
      .audio('menu', path + 'game_menu_BG.mp3')
      .audio('StartBtnDown', path + 'StartBtnDown.mp3')
      .audio('BtnOver', path + 'BtnOver.mp3')
    path = path_prefix + 'assets/Village/';
    this.load
      .atlas('FoxVendor', path + 'FoxVendor.png', path + 'FoxVendor.json')
      .image('VillageBG', path + 'BG.jpg');
  }
  loader() {
    if (this.page === 'LevelMap') {
      {
        let path = path_prefix + 'assets/LevelMap/';
        this.load
          .image('LevelMapBG', path + 'LevelMapBG.jpg')
          .atlas('LevelBtn', path + 'LevelBtn.png', path + 'LevelBtn.json')
          .atlas('GetNewMedal', path + 'GetNewMedal.png', path + 'GetNewMedal.json');
      }
      {
        let path = path_prefix + 'assets/Medal/';
        this.load
          .image('MedalBG', path + 'MedalBG.jpg')
          .atlas('Medal', path + 'Medal.png', path + 'Medal.json')
      }
      {
        let path = path_prefix + 'assets/audio/';
        this.load
          .audio('BtnOver', path + 'BtnOver.mp3')
          .audio('GetMedal', path + 'GetMedal.mp3');
      }
    } else if (this.page === 'AxPage') {
      {
        let path = path_prefix + 'assets/AxPage/';
        this.load
          .image('AxPageBG', path + 'AxPage.jpg')
          .atlas('Panel', path + 'Panel.png', path + 'Panel.json')
          .atlas('QuestionPanelWrongFx', path + 'QuestionPanelWrongFx.png', path + 'QuestionPanelWrongFx.json')
          .atlas('QuestionPanelRightFx', path + 'QuestionPanelRightFx.png', path + 'QuestionPanelRightFx.json')
          .atlas('Btn', path + 'Btn.png', path + 'Btn.json')
          .atlas('FoxWithAx001', path + 'FoxWithAx001.png', path + 'FoxWithAx001.json')
          .atlas('FoxSitting002', path + 'FoxSitting002.png', path + 'FoxSitting002.json')
          .atlas('FoxWithAx', path + 'FoxWithAx.png', path + 'FoxWithAx.json')
          .atlas('FoxWithAx003', path + 'FoxWithAx003.png', path + 'FoxWithAx003.json')
          .atlas('AxBar', path + 'AxBar.png', path + 'AxBar.json')
          .atlas('Fire', path + 'Fire.png', path + 'Fire.json')
          .atlas('Board', path + 'Board.png', path + 'Board.json')
          .atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json');
      }
      {
        let path = path_prefix + 'assets/audio/';
        this.load
          .audio('rightFX', path + 'rightFX.mp3')
          .audio('AxFX', path + 'AxFX.mp3')
          .audio('AddEnergyFX', path + 'add_energyFX.mp3')
          .audio('AxPagePlay', path + 'AxPageBG002.mp3')
          .audio('AxPageSuccess', path + 'AxPageSuccess.mp3')
          .audio('wrongFX', path + 'wrongFX.mp3')
      }
    } else if (this.page === 'LoggingPage') {
      {
        let path = path_prefix + 'assets/LoggingPage/';
        this.load
          .atlas('Panel', path + 'Panel.png', path + 'Panel.json')
          .atlas('QuestionPanelFx', path + 'QuestionPanelFx.png', path + 'QuestionPanelFx.json')
          .image('LoggingPage', path + 'LoggingPage.jpg')
          .image('LoggingPageFront', path + 'LoggingPageFront.png')
          .image('FoxLoggingBtn', path + 'FoxLoggingBtn.jpg')
          .atlas('FoxLogging', path + 'FoxLogging.png', path + 'FoxLogging.json')
          .atlas('FoxLogging001', path + 'FoxLogging001.png', path + 'FoxLogging001.json')
          .atlas('FoxLogging002', path + 'FoxLogging002.png', path + 'FoxLogging002.json')
          .atlas('FoxLogging003', path + 'FoxLogging003.png', path + 'FoxLogging003.json')
          .atlas('FoxBounce001', path + 'FoxBounce001.png', path + 'FoxBounce001.json')
          .atlas('FoxBounce002', path + 'FoxBounce002.png', path + 'FoxBounce002.json')
          .atlas('FoxStanding', path + 'FoxStanding.png', path + 'FoxStanding.json')
          .atlas('TreeBloodBar', path + 'TreeBloodBar.png', path + 'TreeBloodBar.json')
          .image('LoggingPageExitBtnArea', path + 'LoggingPageExitBtnArea.jpg')
          .atlas('ScoreBoard', path + 'ScoreBoard.png', path + 'ScoreBoard.json')
      }
      {
        let path = path_prefix + 'assets/AxPage/';
        this.load
          .atlas('AxBar', path + 'AxBar.png', path + 'AxBar.json')
          .atlas('Btn', path + 'Btn.png', path + 'Btn.json')
      }
      let path = path_prefix + 'assets/HomePage/';
      this.load.atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json');
      {
        let path = path_prefix + 'assets/audio/';
        this.load
          .audio('rightFX', path + 'rightFX.mp3')
          .audio('Logging', path + 'Logging.mp3')
          .audio('LoggingBounce', path + 'LoggingBounce.mp3')
          .audio('LoggingPagePlay', path + 'LoggingPageBG003.mp3')
          .audio('LoggingBG', path + 'LoggingBG.mp3')
          .audio('wrongFX', path + 'wrongFX.mp3')
          .audio('LoggingSuccess', path + 'LoggingSuccess.mp3');
      }
    } else if (this.page === 'CatchBugPage') {
      {
        let path = path_prefix + 'assets/CatchBugPage/';
        this.load
          .image('BG', path + 'CatchBugPageBG.jpg')
          .atlas('FlyingBug', path + 'FlyingBug.png', path + 'FlyingBug.json')
          .atlas('FoxStanding', path + 'FoxStanding.png', path + 'FoxStanding.json')
          .atlas('FoxCatching', path + 'FoxCatching.png', path + 'FoxCatching.json')
          .atlas('FoxFalling', path + 'FoxFalling.png', path + 'FoxFalling.json')
          .atlas('FoxHitting001', path + 'FoxHitting001.png', path + 'FoxHitting001.json')
          .atlas('FoxHitting', path + 'FoxHitting.png', path + 'FoxHitting.json')
          .atlas('FoxStandUp', path + 'FoxStandUp.png', path + 'FoxStandUp.json')
          .atlas('FruitDrop', path + 'FruitDrop.png', path + 'FruitDrop.json')
          .atlas('Board', path + 'Board.png', path + 'Board.json')
          .atlas('TutorialText', path + 'TutorialText.png', path + 'TutorialText.json')
          .atlas('TaskBoard', path + 'TaskBoard.png', path + 'TaskBoard.json')
          .atlas('Panel', path + 'Panel.png', path + 'Panel.json')
      }
      // === audio ===
      {
        let path = path_prefix + 'assets/audio/';
        this.load
          .audio('GetMedal', path + 'GetMedal.mp3')
          .audio('CatchBugPageBG', path + 'CatchBugPageBG.mp3')
          .audio('CatchBugPagefail', path + 'CatchBugPagefail.mp3')
          .audio('CatchBugPagefall', path + 'CatchBugPagefall.mp3')
          .audio('AddEnergyFX', path + 'add_energyFX.mp3')
      }
    } else if (this.page === 'FishingPage') {
      //  ===  FishingPage  ===
      {
        let path = path_prefix + 'assets/fishingpage/';
        this.load
          .atlas('get_stone_fish_atlas', path + 'get_stone_fish_atlas.png', path + 'get_stone_fish_atlas.json')
          .atlas('get_light_blue_fish_atlas', path + 'get_light_blue_fish_atlas.png', path + 'get_light_blue_fish_atlas.json')
          .atlas('FoxPulling', path + 'FoxPulling.png', path + 'FoxPulling.json')
          .atlas('FoxPullingRod', path + 'FoxPullingRod.png', path + 'FoxPullingRod.json')
          .atlas('FoxSitting', path + 'FoxSitting.png', path + 'FoxSitting.json')
          .atlas('FoxSittingRod', path + 'FoxSittingRod.png', path + 'FoxSittingRod.json')
          .atlas('FoxGetFish', path + 'FoxGetFish.png', path + 'FoxGetFish.json')
          .atlas('FoxFalling', path + 'FoxFalling.png', path + 'FoxFalling.json')
          .atlas('Fish', path + 'Fish.png', path + 'Fish.json')
          .atlas('Fish002', path + 'Fish002.png', path + 'Fish002.json')
          .atlas('EnergyTransfer', path + 'EnergyTransfer.png', path + 'EnergyTransfer.json')
          .atlas('GetFishBoard', path + 'GetFishBoard.png', path + 'GetFishBoard.json')
          .atlas('FailBoard', path + 'FailBoard.png', path + 'FailBoard.json')
          .atlas('Panel', path + 'Panel.png', path + 'Panel.json')
          .atlas('ScoreBarAtlas', path + 'ScoreBarAtlas.png', path + 'ScoreBarAtlas.json')
          .image('BG', path + 'BG.jpg')
          .image('mark_tutorial', path + 'mark.png');
      }
      // === audio ===
      {
        let path = path_prefix + 'assets/audio/';
        this.load
          .audio('fishing', path + 'fishing.mp3')
          .audio('rightFX', path + 'rightFX.mp3')
          .audio('wrongFX', path + 'wrongFX.mp3')
          .audio('successFX', path + 'successFX.mp3')
          .audio('failureFX', path + 'failureFX.mp3')
          .audio('alertFX', path + 'alertFX.mp3')
          .audio('startFX', path + 'startFX.mp3')
          .audio('fishingBG', path + 'fishingBG.mp3')
          .audio('clickFX', path + 'clickFX.mp3')
          .audio('add_energyFX', path + 'add_energyFX.mp3');
      }
    } else if (this.page === 'CookingPage') {
      {
        let path = path_prefix + 'assets/CookingPage/';
        this.load
          .image('BG', path + 'cookingpage.jpg')
          .atlas('panel', path + 'panel.png', path + 'panel.json')
          .atlas('fire', path + 'fire.png', path + 'fire.json')
          .atlas('fish', path + 'fish.png', path + 'fish.json')
          .atlas('fox001', path + 'fox.png', path + 'fox.json')
          .atlas('fox002', path + 'fox002.png', path + 'fox002.json')
          .atlas('fox003', path + 'fox003.png', path + 'fox003.json')
          .atlas('fox004', path + 'fox004.png', path + 'fox004.json')
          .atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json')
      }
      {
        let path = path_prefix + 'assets/audio/';
        this.load
          .audio('CookingBG', path + 'CookingBG.mp3')
          .audio('Fail', path + 'failureFX.mp3')
          .audio('Throw', path + 'CatchBugPagefall.mp3')
          .audio('Wrong', path + 'wrongcooking.mp3')
          .audio('Success', path + 'CookingSuccessFX.mp3')
      }
    }
  }
  create() {
    this.state.start(this.page, true, false, 'loading');
  }
  shutdown() {
    this.FoxLogo = null;
    this.tweens.removeAll();
  }
}
