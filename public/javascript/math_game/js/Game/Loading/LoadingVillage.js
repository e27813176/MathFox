import { FoxVendor } from '../images/Village/FoxVendor';
import { TaskBoardLight } from '../images/Village/TaskBoardLight';
import BG from '../images/Village/BG';

export const loadingVillage = (game, imagePath) => {
	game.create = {};
	game.load
		.atlas('FoxVendor', FoxVendor, imagePath + 'FoxVendor.json')
		.atlas('TaskBoardLight', TaskBoardLight, imagePath + 'TaskBoardLight.json')
		.image('VillageBG', BG);
}
