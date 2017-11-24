import 'pixi';
import 'p2';
import Phaser from 'phaser';
import { StageState } from './User/User';
import { config } from './GameConfig';
import GameBoot from './Game/GameBootPage';
import Preload from './Game/GameLoading';
import SendData from './Game/SendData';
import HomePage from './HomePage/HomePage';
import Village from './HomePage/Village';
import LevelMap from './LevelMap/LevelMap';
import MedalBoard from './User/medalBoard';
import Tutorial from './LevelMap/Tutorial';
import AxPage from './AxPage/AxPage';
import LoggingPage from './LoggingPage/LoggingPage';
import CatchBugPage from './CatchBugPage/CatchBugPage';
import FishingPage from './FishingPage/FishingPage';
import CookingPage from './CookingPage/CookingPage';
import getPassedStageIDList from 'getPassedStageIDList';
class Game extends Phaser.Game {
  constructor(StageList) {
    const width = config.width;
    const height = config.height;
    super(width, height, Phaser.AUTO, 'phaser-canvas', null);
    initGameProcess(StageList);
    this.state.add('GameBoot', GameBoot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('SendData', SendData, false);
    this.state.add('HomePage', HomePage, false);
    this.state.add('LevelMap', LevelMap, false);
    this.state.add('Tutorial', Tutorial, false);
    this.state.add('MedalBoard', MedalBoard, false);
    this.state.add('Village', Village, false);
    this.state.add('AxPage', AxPage, false);
    this.state.add('LoggingPage', LoggingPage, false);
    this.state.add('CatchBugPage', CatchBugPage, false);
    this.state.add('FishingPage', FishingPage, false);
    this.state.add('CookingPage', CookingPage, false);
    let StartPage = 'HomePage';
    this.state.start('GameBoot', true, false, StartPage);
  }
}

const initGameProcess = List => {
  List.forEach(page => {
    let Count = `${page}Count`;
    let CompleteCount = `${page}CompleteCount`;
    let Complete = `${page}Complete`;
    StageState[Count] = 1;
    StageState[CompleteCount] = 1;
    StageState[Complete] = 1;
  });
  StageState.LevelFinish = List.length;
}
const StageList = getPassedStageIDList();
window.game = new Game(StageList);
