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
import AxPagePanel from './images/AxPage/Panel';
import { LevelMapBG } from './images/LevelMapBG';
import { GetNewMedal } from './images/GetNewMedal';
import { Medal } from './images/Medal';
import MedalBG from './images/MedalBG';
import Panel from './images/Panel';
import TutorialBG from './images/TutorialBG';
import Fire from './images/Fire';
import Board from './images/Board';
import FoxSitting002 from './images/AxPage/FoxSitting002';
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
import CatchBugPageBoard from './images/CatchBugPage/Board';
import FlyingBug from './images/CatchBugPage/FlyingBug';
import FoxCatching from './images/CatchBugPage/FoxCatching';
import FoxFalling from './images/CatchBugPage/FoxFalling';
import FoxHitting from './images/CatchBugPage/FoxHitting';
import FoxHitting001 from './images/CatchBugPage/FoxHitting001';
import CatchBugFoxStanding from './images/CatchBugPage/CatchBugFoxStanding';
import FoxStandUp from './images/CatchBugPage/FoxStandUp';
import FruitDrop from './images/CatchBugPage/FruitDrop';
import CatchBugPagePanel from './images/CatchBugPage/Panel';
import TaskBoard from './images/CatchBugPage/TaskBoard';
import TutorialText from './images/CatchBugPage/TutorialText';

import FishingPageBG from './images/FishingPage/BG';
import EnergyTransfer from './images/FishingPage/EnergyTransfer';
import FailBoard from './images/FishingPage/FailBoard';
import Fish from './images/FishingPage/Fish';
import Fish002 from './images/FishingPage/Fish002';
import FishingFoxFalling from './images/FishingPage/FoxFalling';
import FoxGetFish from './images/FishingPage/FoxGetFish';
import FoxPulling from './images/FishingPage/FoxPulling';
import FoxPullingRod from './images/FishingPage/FoxPullingRod';
import FishingFoxSitting from './images/FishingPage/FoxSitting';
import FoxSittingRod from './images/FishingPage/FoxSittingRod';
import GetLightBlueFish from './images/FishingPage/get_light_blue_fish_atlas';
import GetFishBoard from './images/FishingPage/GetFishBoard';
import Mark from './images/FishingPage/mark';
import FishingPanel from './images/FishingPage/Panel';
import ScoreBarAtlas from './images/FishingPage/ScoreBarAtlas';

import CookingPageBG from './images/CookingPage/cookingpage';
import CookingFire from './images/CookingPage/fire';
import CookingFish from './images/CookingPage/fish';
import CookingFox from './images/CookingPage/fox';
import CookingFox002 from './images/CookingPage/fox002';
import CookingFox003 from './images/CookingPage/fox003';
import CookingFox004 from './images/CookingPage/fox004';
import CookingPanel from './images/CookingPage/panel';

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
      .atlasJSONArray('Fox', Fox, '', require('../../assets/HomePage/Fox.json'))
      .audio('menu', GameMenuBG)
      .audio('BtnOver', BtnOver)
  }
  loadVillage(imagePath) {
    this.load
      .atlasJSONArray('TaskBoardLight', TaskBoardLight, '', require('../../assets/Village/TaskBoardLight.json'))
      .atlasJSONArray('FoxVendor', FoxVendor, '', require('../../assets/Village/FoxVendor.json'))
      .atlasJSONArray('ArrowSheet', ArrowSheet, '', require('../../assets/Village/ArrowSheet.json'))
      .image('VillageBG', VillageBG);
  }
  loadLevelMap() {
    let audioPath = path_prefix + 'assets/audio/';
    this.load
      .image('LevelMapBG', LevelMapBG)
      .image('TutorialBG', TutorialBG)
      .image('MedalBG', MedalBG)
      .atlasJSONArray('LevelBtn', LevelBtn, '', require('../../assets/LevelMap/LevelBtn.json'))
      .atlasJSONArray('GetNewMedal', GetNewMedal, '', require('../../assets/LevelMap/GetNewMedal.json'))
      .atlasJSONArray('Medal', Medal, '', require('../../assets/Medal/Medal.json'))
      .atlasJSONArray('Panel', Panel, '', require('../../assets/Tutorial/Panel.json'))
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
      .atlasJSONArray('Panel', AxPagePanel, '', require('../../assets/AxPage/Panel.json'))
      .atlasJSONArray('QuestionPanelWrongFx', QuestionPanelWrongFx, '', require('../../assets/AxPage/QuestionPanelWrongFx.json'))
      .atlasJSONArray('QuestionPanelRightFx', QuestionPanelRightFx, '', require('../../assets/AxPage/QuestionPanelRightFx.json'))
      .atlasJSONArray('Btn', Btn, '', require('../../assets/AxPage/Btn.json'))
      .atlasJSONArray('FoxWithAx001', FoxWithAx001, '', require('../../assets/AxPage/FoxWithAx001.json'))
      .atlasJSONArray('FoxSitting002', FoxSitting002, '', require('../../assets/AxPage/FoxSitting002.json'))
      .atlasJSONArray('FoxWithAx', FoxWithAx, '', require('../../assets/AxPage/FoxWithAx.json'))
      .atlasJSONArray('FoxWithAx003', FoxWithAx003, '', require('../../assets/AxPage/FoxWithAx003.json'))
      .atlasJSONArray('Fire', Fire, '', require('../../assets/AxPage/Fire.json'))
      .atlasJSONArray('Board', Board, '', require('../../assets/AxPage/Board.json'))
      .atlasJSONArray('ArrowSheet', ArrowSheet, '', require('../../assets/AxPage/ArrowSheet.json'))
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
      .atlasJSONArray('Panel', LoggingPagePanel, '', require('../../assets/LoggingPage/Panel.json'))
      .atlasJSONArray('QuestionPanelFx', QuestionPanelFx, '', require('../../assets/LoggingPage/QuestionPanelFx.json'))
      .atlasJSONArray('FoxLogging', FoxLogging, '', require('../../assets/LoggingPage/FoxLogging.json'))
      .atlasJSONArray('FoxLogging001', FoxLogging001, '', require('../../assets/LoggingPage/FoxLogging001.json'))
      .atlasJSONArray('FoxLogging002', FoxLogging002, '', require('../../assets/LoggingPage/FoxLogging002.json'))
      .atlasJSONArray('FoxLogging003', FoxLogging003, '', require('../../assets/LoggingPage/FoxLogging003.json'))
      .atlasJSONArray('FoxBounce001', FoxBounce001, '', require('../../assets/LoggingPage/FoxBounce001.json'))
      .atlasJSONArray('FoxBounce002', FoxBounce002, '', require('../../assets/LoggingPage/FoxBounce002.json'))
      .atlasJSONArray('FoxStanding', FoxStanding, '', require('../../assets/LoggingPage/FoxStanding.json'))
      .atlasJSONArray('ScoreBoard', ScoreBoard, '', require('../../assets/LoggingPage/ScoreBoard.json'))
      .atlasJSONArray('TreeBloodBar', TreeBloodBar, '', require('../../assets/LoggingPage/TreeBloodBar.json'))
      .atlasJSONArray('ArrowSheet', ArrowSheet, '', require('../../assets/HomePage/ArrowSheet.json'))
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
    this.load.atlas('AxBar', AxBar, '', require('../../assets/AxPage/AxBar.json'))
  }
  loadCatchBugPage() {
    let path = path_prefix + 'assets/CatchBugPage/';
    let audioPath = path_prefix + 'assets/audio/';
    this.load
      .image('BG', CatchBugPageBG)
      .atlasJSONArray('FlyingBug', FlyingBug, '', require('../../assets/CatchBugPage/FlyingBug.json'))
      .atlasJSONArray('FoxStanding', CatchBugFoxStanding, '', require('../../assets/CatchBugPage/FoxStanding.json'))
      .atlasJSONArray('FoxCatching', FoxCatching, '', require('../../assets/CatchBugPage/FoxCatching.json'))
      .atlasJSONArray('FoxFalling', FoxFalling, '', require('../../assets/CatchBugPage/FoxFalling.json'))
      .atlasJSONArray('FoxHitting001', FoxHitting001, '', require('../../assets/CatchBugPage/FoxHitting001.json'))
      .atlasJSONArray('FoxHitting', FoxHitting, '', require('../../assets/CatchBugPage/FoxHitting.json'))
      .atlasJSONArray('FoxStandUp', FoxStandUp, '', require('../../assets/CatchBugPage/FoxStandUp.json'))
      .atlasJSONArray('FruitDrop', FruitDrop, '', require('../../assets/CatchBugPage/FruitDrop.json'))
      .atlasJSONArray('Board', CatchBugPageBoard, '', require('../../assets/CatchBugPage/Board.json'))
      .atlasJSONArray('TutorialText', TutorialText, '', require('../../assets/CatchBugPage/TutorialText.json'))
      .atlasJSONArray('TaskBoard', TaskBoard, '', require('../../assets/CatchBugPage/TaskBoard.json'))
      .atlasJSONArray('Panel', CatchBugPagePanel, '', require('../../assets/CatchBugPage/Panel.json'))
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
      .atlas('get_light_blue_fish_atlas', GetLightBlueFish, path + 'get_light_blue_fish_atlas.json')
      .atlas('FoxPulling', FoxPulling, path + 'FoxPulling.json')
      .atlas('FoxPullingRod', FoxPullingRod, path + 'FoxPullingRod.json')
      .atlas('FoxSitting', FishingFoxSitting, path + 'FoxSitting.json')
      .atlas('FoxSittingRod', FoxSittingRod, path + 'FoxSittingRod.json')
      .atlas('FoxGetFish', FoxGetFish, path + 'FoxGetFish.json')
      .atlas('FoxFalling', FoxFalling, path + 'FoxFalling.json')
      .atlas('Fish', Fish, path + 'Fish.json')
      .atlas('Fish002', Fish002, path + 'Fish002.json')
      .atlas('EnergyTransfer', EnergyTransfer, path + 'EnergyTransfer.json')
      .atlas('GetFishBoard', GetFishBoard, path + 'GetFishBoard.json')
      .atlas('FailBoard', FailBoard, path + 'FailBoard.json')
      .atlas('Panel', FishingPanel, path + 'Panel.json')
      .atlas('ScoreBarAtlas', ScoreBarAtlas, path + 'ScoreBarAtlas.json')
      .image('BG', FishingPageBG)
      .image('mark_tutorial', Mark)
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
      .image('BG', CookingPageBG)
      .atlas('ArrowSheet', ArrowSheet, path + 'ArrowSheet.json')
      .atlas('panel', CookingPanel, path + 'panel.json')
      .atlas('fire', CookingFire, path + 'fire.json')
      .atlas('fish', CookingFish, path + 'fish.json')
      .atlas('fox001', CookingFox, path + 'fox.json')
      .atlas('fox002', CookingFox002, path + 'fox002.json')
      .atlas('fox003', CookingFox003, path + 'fox003.json')
      .atlas('fox004', CookingFox004, path + 'fox004.json')
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
