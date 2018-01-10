import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { config } from '../GameConfig';
import { ArrowSheet } from './images/ArrowSheet';
import { AxBar } from './images/AxBar';
import { JunyiIcon } from './images/HomePage//JunyiIcon';
import { Fox } from './images/HomePage//Fox';
import HomePageBG from './images/HomePage/BG';
import BtnOver from './audio/BtnOver';
import GameMenuBG from './audio/game_menu_BG';
import { FoxVendor } from './images/Village/FoxVendor';
import { TaskBoardLight } from './images/Village/TaskBoardLight';
import VillageBG from './images/Village/BG';

import { TreeBloodBar } from './images/TreeBloodBar';
import { LevelBtn } from './images/LevelBtn';
import { AxPageBG } from './images/AxPage';
import { LevelMapBG } from './images/LevelMapBG';
import { GetNewMedal } from './images/GetNewMedal';
import { Medal } from './images/Medal';
import MedalBG from './images/MedalBG';
import Panel from './images/Panel';
import TutorialBG from './images/TutorialBG';
import Fire from './images/Fire';
import Board from './images/Board';
import FoxWithAx from './images/FoxWithAx';
import FoxWithAx001 from './images/FoxWithAx001';
import FoxWithAx003 from './images/FoxWithAx003';
import QuestionPanelFx from './images/QuestionPanelFx';
import QuestionPanelRightFx from './images/QuestionPanelRightFx';
import QuestionPanelWrongFx from './images/QuestionPanelWrongFx';
import Btn from './images/Btn';
import FoxBounce001 from './images/LoggingPage/FoxBounce001';
import FoxBounce002 from './images/LoggingPage/FoxBounce002';
import FoxLogging from './images/LoggingPage/FoxLogging';
import FoxLogging001 from './images/LoggingPage/FoxLogging001';
import FoxLogging002 from './images/LoggingPage/FoxLogging002';
import FoxLogging003 from './images/LoggingPage/FoxLogging003';
import FoxLoggingBtn from './images/LoggingPage/FoxLoggingBtn';
import FoxStanding from './images/LoggingPage/FoxStanding';
import LoggingPage from './images/LoggingPage/LoggingPage';
import LoggingPageExitBtnArea from './images/LoggingPage/LoggingPageExitBtnArea';
import LoggingPageFront from './images/LoggingPage/LoggingPageFront';
import ScoreBoard from './images/LoggingPage/ScoreBoard';
import LoggingPagePanel from './images/LoggingPage/Panel';
import CatchBugPageBG from './images/CatchBugPage/CatchBugPageBG';

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

    let path = path_prefix + 'assets/';

    let audioPath = path + 'audio/';
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
      .image('HomePageBG', HomePageBG)
      .image('JunyiIconBtn', JunyiIcon)
      .atlas('Fox', Fox, imagePath + 'Fox.json')
      .audio('menu', GameMenuBG)
      .audio('BtnOver', BtnOver)
  }
  loadVillage(imagePath) {
    this.load
      .atlas('TaskBoardLight', TaskBoardLight, imagePath + 'TaskBoardLight.json')
      .atlas('FoxVendor', FoxVendor, imagePath + 'FoxVendor.json')
      .atlas('ArrowSheet', ArrowSheet, imagePath + 'ArrowSheet.json')
      .image('VillageBG', VillageBG);
  }
  loadLevelMap() {
    let path = path_prefix + 'assets/LevelMap/';
    let medalPath = path_prefix + 'assets/Medal/';
    let audioPath = path_prefix + 'assets/audio/';
    let tutorialPath = path_prefix + 'assets/Tutorial/';
    this.load
      .image('LevelMapBG', LevelMapBG)
      .atlas('LevelBtn', LevelBtn, path + 'LevelBtn.json')
      .atlas('GetNewMedal', GetNewMedal, path + 'GetNewMedal.json')
      .image('MedalBG', MedalBG)
      .atlas('Medal', Medal, medalPath + 'Medal.json')
      .image('TutorialBG', TutorialBG)
      .atlas('Panel', Panel, tutorialPath + 'Panel.json')
      .audio('RightFX', audioPath + 'rightFX.mp3')
      .audio('WrongFX', audioPath + 'wrongFX.mp3')
      .audio('StartFX', audioPath + 'startFX.mp3')
      .audio('ClickFX', audioPath + 'clickFX.mp3')
      .audio('BtnOver', audioPath + 'BtnOver.mp3')
      .audio('GetMedal', audioPath + 'GetMedal.mp3');
  }
  loadAxPage() {
    let imagePath = path_prefix + 'assets/AxPage/';
    let audioPath = path_prefix + 'assets/audio/';
    this.loadAxBar();
    this.load
      .image('AxPageBG', AxPageBG)
      .atlas('Panel', imagePath + 'Panel.png', imagePath + 'Panel.json')
      .atlas('QuestionPanelWrongFx', QuestionPanelWrongFx, imagePath + 'QuestionPanelWrongFx.json')
      .atlas('QuestionPanelRightFx', QuestionPanelRightFx, imagePath + 'QuestionPanelRightFx.json')
      .atlas('Btn', Btn, imagePath + 'Btn.json')
      .atlas('FoxWithAx001', FoxWithAx001, imagePath + 'FoxWithAx001.json')
      .atlas('FoxSitting002', imagePath + 'FoxSitting002.png', imagePath + 'FoxSitting002.json')
      .atlas('FoxWithAx', FoxWithAx, imagePath + 'FoxWithAx.json')
      .atlas('FoxWithAx003', FoxWithAx003, imagePath + 'FoxWithAx003.json')
      .atlas('Fire', Fire, imagePath + 'Fire.json')
      .atlas('Board', Board, imagePath + 'Board.json')
      .atlas('ArrowSheet', ArrowSheet, imagePath + 'ArrowSheet.json')
      .audio('rightFX', audioPath + 'rightFX.mp3')
      .audio('AxFX', audioPath + 'AxFX.mp3')
      .audio('AddEnergyFX', audioPath + 'add_energyFX.mp3')
      .audio('AxPagePlay', audioPath + 'AxPageBG002.mp3')
      .audio('AxPageSuccess', audioPath + 'AxPageSuccess.mp3')
      .audio('wrongFX', audioPath + 'wrongFX.mp3')
  }
  loadLoggingPage() {
    let imagePath = path_prefix + 'assets/LoggingPage/';
    let axBarPath = path_prefix + 'assets/AxPage/';
    let arrowSheetpath = path_prefix + 'assets/HomePage/';
    let audioPath = path_prefix + 'assets/audio/';
    this.load
      .image('LoggingPageExitBtnArea', LoggingPageExitBtnArea)
      .image('LoggingPage', LoggingPage)
      .image('LoggingPageFront', LoggingPageFront)
      .image('FoxLoggingBtn', FoxLoggingBtn)
      .atlas('Panel', LoggingPagePanel, imagePath + 'Panel.json')
      .atlas('QuestionPanelFx', QuestionPanelFx, imagePath + 'QuestionPanelFx.json')
      .atlas('FoxLogging', FoxLogging, imagePath + 'FoxLogging.json')
      .atlas('FoxLogging001', FoxLogging001, imagePath + 'FoxLogging001.json')
      .atlas('FoxLogging002', FoxLogging002, imagePath + 'FoxLogging002.json')
      .atlas('FoxLogging003', FoxLogging003, imagePath + 'FoxLogging003.json')
      .atlas('FoxBounce001', FoxBounce001, imagePath + 'FoxBounce001.json')
      .atlas('FoxBounce002', FoxBounce002, imagePath + 'FoxBounce002.json')
      .atlas('FoxStanding', FoxStanding, imagePath + 'FoxStanding.json')
      .atlas('ScoreBoard', ScoreBoard, imagePath + 'ScoreBoard.json')
      .atlas('TreeBloodBar', TreeBloodBar, imagePath + 'TreeBloodBar.json')
      .atlas('ArrowSheet', ArrowSheet, arrowSheetpath + 'ArrowSheet.json')
      .audio('rightFX', audioPath + 'rightFX.mp3')
      .audio('Logging', audioPath + 'Logging.mp3')
      .audio('LoggingBounce', audioPath + 'LoggingBounce.mp3')
      .audio('LoggingPagePlay', audioPath + 'LoggingPageBG003.mp3')
      .audio('LoggingBG', audioPath + 'LoggingBG.mp3')
      .audio('wrongFX', audioPath + 'wrongFX.mp3')
      .audio('LoggingSuccess', audioPath + 'LoggingSuccess.mp3');
    this.loadAxBar();
  }
  loadAxBar() {
    let imagePath = path_prefix + 'assets/AxPage/';
    this.load.atlas('AxBar', AxBar, imagePath + 'AxBar.json')
  }
  loadCatchBugPage() {
    let path = path_prefix + 'assets/CatchBugPage/';
    let audioPath = path_prefix + 'assets/audio/';
    this.load
      .image('BG', CatchBugPageBG)
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
    console.log(this.page);
    this.state.start(this.page, true, false, 'loading');
  }
  shutdown() {
    this.FoxLogo = null;
    this.tweens.removeAll();
  }
}
