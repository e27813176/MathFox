import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { config } from '../GameConfig';
import { ArrowSheet } from './images/ArrowSheet';
import { AxBar } from './images/AxBar';
import { JunyiIcon } from './images/HomePage/JunyiIcon';

import { TaskBoardLight } from './images/Village/TaskBoardLight';

import { TreeBloodBar } from './images/TreeBloodBar';
import Panel from './images/Panel';
import Btn from './images/Btn';
import FoxLoggingBtn from './images/LoggingPage/FoxLoggingBtn';
import LoggingPageExitBtnArea from './images/LoggingPage/LoggingPageExitBtnArea';

import CatchBugPageBoard from './images/CatchBugPage/Board';
import CatchBugPagePanel from './images/CatchBugPage/Panel';
import TaskBoard from './images/CatchBugPage/TaskBoard';

import FailBoard from './images/FishingPage/FailBoard';
import Mark from './images/FishingPage/mark';

import BtnOver from './audio/BtnOver';
import ClickFX from './audio/clickFX';
import GetMedal from './audio/GetMedal';
import RightFX from './audio/rightFX';
import StartFX from './audio/startFX';
import WrongFX from './audio/wrongFX';
import AddEnergyFX from './audio/add_energyFX';
import AxFX from './audio/AxFX';
import AxPageSuccess from './audio/AxPageSuccess';
import AlertFX from './audio/alertFX';
import CatchBugPagefail from './audio/CatchBugPagefail';
import CatchBugPagefall from './audio/CatchBugPagefall';
import CookingSuccessFX from './audio/CookingSuccessFX';
import FailureFX from './audio/failureFX';
import Logging from './audio/Logging';
import LoggingBounce from './audio/LoggingBounce';
import LoggingPageBG003 from './audio/LoggingPageBG003';
import LoggingSuccess from './audio/LoggingSuccess';
import SuccessFX from './audio/successFX';
import Wrongcooking from './audio/wrongcooking';

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

    if (this.page === 'Village') {
      this.loadHomePage();
      this.loadVillage();
    } else if (this.page === 'LevelMap') this.loadLevelMap();
    else if (this.page === 'AxPage') this.loadAxPage();
    else if (this.page === 'LoggingPage') this.loadLoggingPage();
    else if (this.page === 'CatchBugPage') this.loadCatchBugPage();
    else if (this.page === 'FishingPage') this.loadFishingPage();
    else if (this.page === 'CookingPage') this.loadCookingPage();
  }
  loadHomePage() {
    this.load
      .image('HomePageBG', require('../../assets/HomePage/BG.jpg'))
      .image('JunyiIconBtn', JunyiIcon)
      .atlasJSONArray('Fox', require('../../assets/HomePage/Fox.png'), '', require('../../assets/HomePage/Fox.json'))
      .audio('menu', require('../../assets/audio/game_menu_BG.mp3'))
      .audio('BtnOver', BtnOver)
  }
  loadVillage() {
    this.load
      .atlasJSONArray('TaskBoardLight', TaskBoardLight, '', require('../../assets/Village/TaskBoardLight.json'))
      .atlasJSONArray('FoxVendor', require('../../assets/Village/FoxVendor.png'), '', require('../../assets/Village/FoxVendor.json'))
      .atlasJSONArray('ArrowSheet', require('../../assets/Village/ArrowSheet.png'), '', require('../../assets/Village/ArrowSheet.json'))
      .image('VillageBG', require('../../assets/Village/BG.jpg'));
  }
  loadLevelMap() {
    this.load
      .image('LevelMapBG', require('../../assets/LevelMap/LevelMapBG.jpg'))
      .image('TutorialBG', require('../../assets/Tutorial/TutorialBG.jpg'))
      .image('MedalBG', require('../../assets/Medal/MedalBG.jpg'))
      .atlasJSONArray('LevelBtn', require('../../assets/LevelMap/LevelBtn.png'), '', require('../../assets/LevelMap/LevelBtn.json'))
      .atlasJSONArray('GetNewMedal', require('../../assets/LevelMap/GetNewMedal.png'), '', require('../../assets/LevelMap/GetNewMedal.json'))
      .atlasJSONArray('Medal', require('../../assets/Medal/Medal.png'), '', require('../../assets/Medal/Medal.json'))
      .atlasJSONArray('Panel', Panel, '', require('../../assets/Tutorial/Panel.json'))
      .audio('RightFX', RightFX)
      .audio('WrongFX', WrongFX)
      .audio('StartFX', StartFX)
      .audio('ClickFX', ClickFX)
      .audio('BtnOver', BtnOver)
      .audio('GetMedal', GetMedal)
  }
  loadAxPage() {
    this.loadAxBar();
    this.load
      .image('AxPageBG', require('../../assets/AxPage/AxPage.jpg'))
      .atlasJSONArray('Panel', require('../../assets/AxPage/Panel.png'), '', require('../../assets/AxPage/Panel.json'))
      .atlasJSONArray('QuestionPanelWrongFx', require('../../assets/AxPage/QuestionPanelWrongFX.png'), '', require('../../assets/AxPage/QuestionPanelWrongFx.json'))
      .atlasJSONArray('QuestionPanelRightFx', require('../../assets/AxPage/QuestionPanelRightFX.png'), '', require('../../assets/AxPage/QuestionPanelRightFx.json'))
      .atlasJSONArray('Btn', Btn, '', require('../../assets/AxPage/Btn.json'))
      .atlasJSONArray('FoxWithAx001', require('../../assets/AxPage/FoxWithAx001.png'), '', require('../../assets/AxPage/FoxWithAx001.json'))
      .atlasJSONArray('FoxSitting002', require('../../assets/AxPage/FoxSitting002.png'), '', require('../../assets/AxPage/FoxSitting002.json'))
      .atlasJSONArray('FoxWithAx', require('../../assets/AxPage/FoxWithAx.png'), '', require('../../assets/AxPage/FoxWithAx.json'))
      .atlasJSONArray('FoxWithAx003', require('../../assets/AxPage/FoxWithAx003.png'), '', require('../../assets/AxPage/FoxWithAx003.json'))
      .atlasJSONArray('Fire', require('../../assets/AxPage/Fire.png'), '', require('../../assets/AxPage/Fire.json'))
      .atlasJSONArray('Board', require('../../assets/AxPage/Board.png'), '', require('../../assets/AxPage/Board.json'))
      .atlasJSONArray('ArrowSheet', ArrowSheet, '', require('../../assets/AxPage/ArrowSheet.json'))
      .audio('rightFX', RightFX)
      .audio('AxFX', AxFX)
      .audio('AddEnergyFX', AddEnergyFX)
      .audio('AxPagePlay', require('../../assets/audio/AxPageBG002.mp3'))
      .audio('AxPageSuccess', AxPageSuccess)
      .audio('wrongFX', WrongFX)
  }
  loadLoggingPage() {
    this.load
      .image('LoggingPageExitBtnArea', LoggingPageExitBtnArea)
      .image('LoggingPage', require('../../assets/LoggingPage/LoggingPage.jpg'))
      .image('LoggingPageFront', require('../../assets/LoggingPage/LoggingPageFront.png'))
      .image('FoxLoggingBtn', FoxLoggingBtn)
      .atlasJSONArray('Panel', require('../../assets/LoggingPage/Panel.png'), '', require('../../assets/LoggingPage/Panel.json'))
      .atlasJSONArray('QuestionPanelFx', require('../../assets/LoggingPage/QuestionPanelFx.png'), '', require('../../assets/LoggingPage/QuestionPanelFx.json'))
      .atlasJSONArray('FoxLogging', require('../../assets/LoggingPage/FoxLogging.png'), '', require('../../assets/LoggingPage/FoxLogging.json'))
      .atlasJSONArray('FoxLogging001', require('../../assets/LoggingPage/FoxLogging001.png'), '', require('../../assets/LoggingPage/FoxLogging001.json'))
      .atlasJSONArray('FoxLogging002', require('../../assets/LoggingPage/FoxLogging002.png'), '', require('../../assets/LoggingPage/FoxLogging002.json'))
      .atlasJSONArray('FoxLogging003', require('../../assets/LoggingPage/FoxLogging003.png'), '', require('../../assets/LoggingPage/FoxLogging003.json'))
      .atlasJSONArray('FoxBounce001', require('../../assets/LoggingPage/FoxBounce001.png'), '', require('../../assets/LoggingPage/FoxBounce001.json'))
      .atlasJSONArray('FoxBounce002', require('../../assets/LoggingPage/FoxBounce002.png'), '', require('../../assets/LoggingPage/FoxBounce002.json'))
      .atlasJSONArray('FoxStanding', require('../../assets/LoggingPage/FoxStanding.png'), '', require('../../assets/LoggingPage/FoxStanding.json'))
      .atlasJSONArray('ScoreBoard', require('../../assets/LoggingPage/ScoreBoard.png'), '', require('../../assets/LoggingPage/ScoreBoard.json'))
      .atlasJSONArray('TreeBloodBar', TreeBloodBar, '', require('../../assets/LoggingPage/TreeBloodBar.json'))
      .atlasJSONArray('ArrowSheet', ArrowSheet, '', require('../../assets/HomePage/ArrowSheet.json'))
      .audio('rightFX', RightFX)
      .audio('Logging', Logging)
      .audio('LoggingBounce', LoggingBounce)
      .audio('LoggingPagePlay', LoggingPageBG003)
      .audio('LoggingBG', require('../../assets/audio/LoggingBG.mp3'))
      .audio('wrongFX', WrongFX)
      .audio('LoggingSuccess', LoggingSuccess);
    this.loadAxBar();
  }
  loadAxBar() {
    this.load.atlas('AxBar', AxBar, '', require('../../assets/AxPage/AxBar.json'))
  }
  loadCatchBugPage() {
    this.load
      .image('BG', require('../../assets/CatchBugPage/CatchBugPageBG.jpg'))
      .atlasJSONArray('FlyingBug', require('../../assets/CatchBugPage/FlyingBug.png'), '', require('../../assets/CatchBugPage/FlyingBug.json'))
      .atlasJSONArray('FoxStanding', require('../../assets/CatchBugPage/FoxStanding.png'), '', require('../../assets/CatchBugPage/FoxStanding.json'))
      .atlasJSONArray('FoxCatching', require('../../assets/CatchBugPage/FoxCatching.png'), '', require('../../assets/CatchBugPage/FoxCatching.json'))
      .atlasJSONArray('FoxFalling', require('../../assets/CatchBugPage/FoxFalling.png'), '', require('../../assets/CatchBugPage/FoxFalling.json'))
      .atlasJSONArray('FoxHitting001', require('../../assets/CatchBugPage/FoxHitting001.png'), '', require('../../assets/CatchBugPage/FoxHitting001.json'))
      .atlasJSONArray('FoxHitting', require('../../assets/CatchBugPage/FoxHitting.png'), '', require('../../assets/CatchBugPage/FoxHitting.json'))
      .atlasJSONArray('FoxStandUp', require('../../assets/CatchBugPage/FoxStandUp.png'), '', require('../../assets/CatchBugPage/FoxStandUp.json'))
      .atlasJSONArray('FruitDrop', require('../../assets/CatchBugPage/FruitDrop.png'), '', require('../../assets/CatchBugPage/FruitDrop.json'))
      .atlasJSONArray('Board', CatchBugPageBoard, '', require('../../assets/CatchBugPage/Board.json'))
      .atlasJSONArray('TutorialText', require('../../assets/CatchBugPage/TutorialText.png'), '', require('../../assets/CatchBugPage/TutorialText.json'))
      .atlasJSONArray('TaskBoard', TaskBoard, '', require('../../assets/CatchBugPage/TaskBoard.json'))
      .atlasJSONArray('Panel', CatchBugPagePanel, '', require('../../assets/CatchBugPage/Panel.json'))
      .audio('GetMedal', GetMedal)
      .audio('CatchBugPageBG', require('../../assets/audio/CatchBugPageBG.mp3'))
      .audio('CatchBugPagefail', CatchBugPagefail)
      .audio('CatchBugPagefall', CatchBugPagefall)
      .audio('AddEnergyFX', AddEnergyFX)
  }
  loadFishingPage() {
    this.load
      .atlasJSONArray('get_light_blue_fish_atlas', require('../../assets/fishingpage/get_light_blue_fish_atlas.png'), '', require('../../assets/fishingpage/get_light_blue_fish_atlas.json'))
      .atlasJSONArray('FoxPulling', require('../../assets/fishingpage/FoxPulling.png'), '', require('../../assets/fishingpage/FoxPulling.json'))
      .atlasJSONArray('FoxPullingRod', require('../../assets/fishingpage/FoxPullingRod.png'), '', require('../../assets/fishingpage/FoxPullingRod.json'))
      .atlasJSONArray('FoxSitting', require('../../assets/fishingpage/FoxSitting.png'), '', require('../../assets/fishingpage/FoxSitting.json'))
      .atlasJSONArray('FoxSittingRod', require('../../assets/fishingpage/FoxSittingRod.png'), '', require('../../assets/fishingpage/FoxSittingRod.json'))
      .atlasJSONArray('FoxGetFish', require('../../assets/fishingpage/FoxGetFish.png'), '', require('../../assets/fishingpage/FoxGetFish.json'))
      .atlasJSONArray('FoxFalling', require('../../assets/fishingpage/FoxFalling.png'), '', require('../../assets/fishingpage/FoxFalling.json'))
      .atlasJSONArray('Fish', require('../../assets/fishingpage/Fish.png'), '', require('../../assets/fishingpage/Fish.json'))
      .atlasJSONArray('Fish002', require('../../assets/fishingpage/Fish002.png'), '', require('../../assets/fishingpage/Fish002.json'))
      .atlasJSONArray('EnergyTransfer', require('../../assets/fishingpage/EnergyTransfer.png'), '', require('../../assets/fishingpage/EnergyTransfer.json'))
      .atlasJSONArray('GetFishBoard', require('../../assets/fishingpage/GetFishBoard.png'), '', require('../../assets/fishingpage/GetFishBoard.json'))
      .atlasJSONArray('FailBoard', FailBoard, '', require('../../assets/fishingpage/FailBoard.json'))
      .atlasJSONArray('Panel', require('../../assets/fishingpage/Panel.png'), '', require('../../assets/fishingpage/Panel.json'))
      .atlasJSONArray('ScoreBarAtlas', require('../../assets/fishingpage/ScoreBarAtlas.png'), '', require('../../assets/fishingpage/ScoreBarAtlas.json'))
      .image('BG', require('../../assets/fishingpage/BG.jpg'))
      .image('mark_tutorial', Mark)
      .audio('fishing', require('../../assets/audio/fishing.mp3'))
      .audio('rightFX', RightFX)
      .audio('wrongFX', WrongFX)
      .audio('successFX', SuccessFX)
      .audio('failureFX', FailureFX)
      .audio('alertFX', AlertFX)
      .audio('startFX', StartFX)
      .audio('fishingBG', require('../../assets/audio/fishingBG.mp3'))
      .audio('clickFX', ClickFX)
      .audio('add_energyFX', AddEnergyFX);
  }
  loadCookingPage() {
    this.load
      .image('BG', require('../../assets/CookingPage/cookingpage.jpg'))
      .atlas('ArrowSheet', ArrowSheet, '', require('../../assets/CookingPage/ArrowSheet.json'))
      .atlas('panel', require('../../assets/CookingPage/panel.png'), '', require('../../assets/CookingPage/panel.json'))
      .atlas('fire', require('../../assets/CookingPage/fire.png'), '', require('../../assets/CookingPage/fire.json'))
      .atlas('fish', require('../../assets/CookingPage/fish.png'), '', require('../../assets/CookingPage/fish.json'))
      .atlas('fox001', require('../../assets/CookingPage/fox.png'), '', require('../../assets/CookingPage/fox.json'))
      .atlas('fox002', require('../../assets/CookingPage/fox002.png'), '', require('../../assets/CookingPage/fox002.json'))
      .atlas('fox003', require('../../assets/CookingPage/fox003.png'), '', require('../../assets/CookingPage/fox003.json'))
      .atlas('fox004', require('../../assets/CookingPage/fox004.png'), '', require('../../assets/CookingPage/fox004.json'))
      .audio('CookingBG', require('../../assets/audio/CookingBG.mp3'))
      .audio('Fail', FailureFX)
      .audio('Throw', CatchBugPagefall)
      .audio('Wrong', Wrongcooking)
      .audio('Success', CookingSuccessFX)
  }
  create() {
    this.state.start(this.page, true, false, 'loading');
  }
  shutdown() {
    this.FoxLogo = null;
    this.tweens.removeAll();
  }
}
