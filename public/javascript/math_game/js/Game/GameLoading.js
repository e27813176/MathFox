import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { config } from '../GameConfig';

export default class extends Phaser.State {
  init(page) {
    this.page = page;
  }
  preload() {
    this.loadingBar = this.add.sprite(config.centerX - 300, 620, 'LoadingBar');
    this.loadingBar.alpha = 1;
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar, 0);

    this.FoxLogo = this.add.sprite(config.centerX, config.centerY, 'FoxLogo');
    this.FoxLogo.anchor.setTo(0.5);
    this.add.tween(this.FoxLogo).to({ alpha: 0.5 }, 800, 'Quad.easeInOut', true, 0, false, true).loop(true);

    this.LoadingBarFrame = this.add.sprite(config.centerX, 620, 'LoadingBarFrame');
    this.LoadingBarFrame.alpha = 1;
    this.LoadingBarFrame.anchor.setTo(0.5, 0.5);

    let path = path_prefix + config.version + '/assets/';
    let audioPath = path + '/audio/';
    let imagePath = path + this.page + '/';

    if (this.page === 'HomePage') {
      this.loadHomePage(imagePath, audioPath);
      imagePath = path + 'Village/';
      this.loadVillage(imagePath);
    }
    else if (this.page === 'LevelMap') this.loadLevelMap();
    else if (this.page === 'AxPage') this.loadAxPage();
    else if (this.page === 'LoggingPage') this.loadLoggingPage();
    else if (this.page === 'CatchBugPage') this.loadCatchBugPage();
    else if (this.page === 'FishingPage') this.loadFishingPage();
    else if (this.page === 'CookingPage') this.loadCookingPage();
  }
  loadHomePage(imagePath, audioPath) {
    this.load
      .image('HomePageBG', imagePath + 'HomePageBG.jpg')
      .image('FrontBG', imagePath + 'FrontBG.png')
      .image('JunyiIconBtn', imagePath + 'JunyiIconBtn.png')
      .image('BackPackIcon', imagePath + 'BackPackIcon.png')
      .image('UserPanel', imagePath + 'UserPanel.png')
      .atlas('ArrowSheet', imagePath + 'ArrowSheet.png', imagePath + 'ArrowSheet.json')
      .atlas('Fox', imagePath + 'Fox.png', imagePath + 'Fox.json')
      .audio('menu', audioPath + 'game_menu_BG.mp3')
      .audio('StartBtnDown', audioPath + 'StartBtnDown.mp3')
      .audio('BtnOver', audioPath + 'BtnOver.mp3')
  }
  loadVillage(imagePath) {
    this.load
      .atlas('FoxVendor', imagePath + 'FoxVendor.png', imagePath + 'FoxVendor.json')
      .image('VillageBG', imagePath + 'BG.jpg');
  }
  loadLevelMap() {
    let path = path_prefix + 'assets/LevelMap/';
    this.load
      .image('LevelMapBG', path + 'LevelMapBG.jpg')
      .atlas('LevelBtn', path + 'LevelBtn.png', path + 'LevelBtn.json')
      .atlas('GetNewMedal', path + 'GetNewMedal.png', path + 'GetNewMedal.json');
    path = path_prefix + 'assets/Medal/';
    this.load
      .image('MedalBG', path + 'MedalBG.jpg')
      .atlas('Medal', path + 'Medal.png', path + 'Medal.json')
    path = path_prefix + 'assets/Tutorial/';
    let audioPath = path_prefix + 'assets/audio/';
    this.load.image('TutorialBG', path + 'TutorialBG.jpg')
      .atlas('Panel', path + 'Panel.png', path + 'Panel.json')
      .audio('RightFX', audioPath + 'rightFX.mp3')
      .audio('WrongFX', audioPath + 'wrongFX.mp3')
      .audio('StartFX', audioPath + 'startFX.mp3')
      .audio('ClickFX', audioPath + 'clickFX.mp3')
      .audio('BtnOver', audioPath + 'BtnOver.mp3')
      .audio('GetMedal', audioPath + 'GetMedal.mp3');
  }
  loadAxPage() {
    let path = path_prefix + 'assets/AxPage/';
    let audioPath = path_prefix + 'assets/audio/';
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
      .atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json')
      .audio('rightFX', audioPath + 'rightFX.mp3')
      .audio('AxFX', audioPath + 'AxFX.mp3')
      .audio('AddEnergyFX', audioPath + 'add_energyFX.mp3')
      .audio('AxPagePlay', audioPath + 'AxPageBG002.mp3')
      .audio('AxPageSuccess', audioPath + 'AxPageSuccess.mp3')
      .audio('wrongFX', audioPath + 'wrongFX.mp3')
  }
  loadLoggingPage() {
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
      .atlas('ScoreBoard', path + 'ScoreBoard.png', path + 'ScoreBoard.json');
    path = path_prefix + 'assets/AxPage/';
    this.load
      .atlas('AxBar', path + 'AxBar.png', path + 'AxBar.json')
      .atlas('Btn', path + 'Btn.png', path + 'Btn.json')
    path = path_prefix + 'assets/HomePage/';
    this.load.atlas('ArrowSheet', path + 'ArrowSheet.png', path + 'ArrowSheet.json');
    path = path_prefix + 'assets/audio/';
    this.load
      .audio('rightFX', path + 'rightFX.mp3')
      .audio('Logging', path + 'Logging.mp3')
      .audio('LoggingBounce', path + 'LoggingBounce.mp3')
      .audio('LoggingPagePlay', path + 'LoggingPageBG003.mp3')
      .audio('LoggingBG', path + 'LoggingBG.mp3')
      .audio('wrongFX', path + 'wrongFX.mp3')
      .audio('LoggingSuccess', path + 'LoggingSuccess.mp3');
  }
  loadCatchBugPage() {
    let path = path_prefix + 'assets/CatchBugPage/';
    let audioPath = path_prefix + 'assets/audio/';
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
      .audio('GetMedal', audioPath + 'GetMedal.mp3')
      .audio('CatchBugPageBG', audioPath + 'CatchBugPageBG.mp3')
      .audio('CatchBugPagefail', audioPath + 'CatchBugPagefail.mp3')
      .audio('CatchBugPagefall', audioPath + 'CatchBugPagefall.mp3')
      .audio('AddEnergyFX', audioPath + 'add_energyFX.mp3')
  }
  loadFishingPage() {
    let path = path_prefix + 'assets/fishingpage/';
    let audioPath = path_prefix + 'assets/audio/';
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
      .image('mark_tutorial', path + 'mark.png')
      .audio('fishing', audioPath + 'fishing.mp3')
      .audio('rightFX', audioPath + 'rightFX.mp3')
      .audio('wrongFX', audioPath + 'wrongFX.mp3')
      .audio('successFX', audioPath + 'successFX.mp3')
      .audio('failureFX', audioPath + 'failureFX.mp3')
      .audio('alertFX', audioPath + 'alertFX.mp3')
      .audio('startFX', audioPath + 'startFX.mp3')
      .audio('fishingBG', audioPath + 'fishingBG.mp3')
      .audio('clickFX', audioPath + 'clickFX.mp3')
      .audio('add_energyFX', audioPath + 'add_energyFX.mp3');
  }
  loadCookingPage() {
    let path = path_prefix + 'assets/CookingPage/';
    let audioPath = path_prefix + 'assets/audio/';
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
      .audio('CookingBG', audioPath + 'CookingBG.mp3')
      .audio('Fail', audioPath + 'failureFX.mp3')
      .audio('Throw', audioPath + 'CatchBugPagefall.mp3')
      .audio('Wrong', audioPath + 'wrongcooking.mp3')
      .audio('Success', audioPath + 'CookingSuccessFX.mp3')
  }
  create() {
    this.state.start(this.page, true, false, 'loading');
  }
  shutdown() {
    this.FoxLogo = null;
    this.tweens.removeAll();
  }
}
