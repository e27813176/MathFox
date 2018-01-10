import { JunyiIcon } from '../images/HomePage//JunyiIcon';
import { Fox } from '../images/HomePage//Fox';
import BG from '../images/HomePage/BG';
import BtnOver from '../audio/BtnOver';
import GameMenuBG from '../audio/game_menu_BG';

export const loadingHome = (game, imagePath) => {
	game.create = {};
	game.load
		.image('HomePageBG', BG)
		.image('JunyiIconBtn', JunyiIcon)
		.atlas('Fox', Fox, imagePath + 'Fox.json')
		.audio('menu', GameMenuBG)
		.audio('BtnOver', BtnOver)
}
