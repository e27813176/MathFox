import { config } from '../GameConfig';
import HomePage from './HomePage';

export class HomePageGame extends HomePage {
	constructor() {
		super();
	}
	helloWorld() {
		console.log('Hihi');
	}
}
