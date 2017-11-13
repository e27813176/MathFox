demo.HomePage.chatroom = {
	create: function () {
		this.posX = -500;
		this.posY = 0;
		this.turnClick = 0;

		this.ChatRoom = game.add.graphics();
		this.ChatRoom.lineStyle(2, 0x1e0000, 1);
		this.ChatRoom.beginFill(0xdcc1b1);
		this.ChatRoom.drawRect(this.posX, this.posY, 500, 800);
		this.ChatRoom.beginFill(0x1e0000);
		this.ChatRoom.drawRect(this.posX, this.posY, 500, 60);
		this.ChatRoom.drawRect(this.posX, this.posY + 650, 500, 150);
		this.ChatRoom.events.onInputDown.add(this.block, this);
		this.ChatRoom.inputEnabled = true;
		//this.ChatRoom.drawRect(200,345,500,455);
		let Property = {
			font: '18px Arial',
			fill: '#ffffff',
			fillAlpha: 1,
			fontWeight: 'bold',
			font: '20px Arial',
			width: 300,
			height: 30,
			padding: 4,
			borderWidth: 2,
			borderColor: '#8c614d',
			borderRadius: 5,
			placeHolder: '留言...',
			cursorColor: '#ffffff',
			backgroundColor: '#2e0000'

		}
		this.message = game.add.inputField(this.posX + 15, this.posY + 660, Property);

		this.sendBtn = game.add.graphics();
		this.sendBtn.beginFill(0x2e0000);
		this.sendBtn.lineStyle(2, 0x8c614d, 1);
		this.sendBtn.drawRoundedRect(this.posX + 340, this.posY + 660, 80, 40, 5);
		this.sendBtn.events.onInputDown.add(this.sendMessage, this);
		this.sendBtn.inputEnabled = true;
		this.sendBtn.input.useHandCursor = true;

		var style = { font: "bold 25px Arial", fill: "#8c614d", align: "center" };
		this.sendText = game.add.text(this.posX + 350, this.posY + 660, 'Send', style)
		this.sendKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		this.sendKey.onDown.add(this.sendMessage, this);


		this.messageWindow = game.add.graphics();
		this.messageWindow.beginFill(0xffffff);
		this.messageWindow.drawRect(this.posX, this.posY + 65, 500, 580);
		this.messageWindow.alpha = 0;

		this.arrowUp = game.add.graphics();
		this.arrowUp.beginFill(0x4e2010);
		this.arrowUp.drawRoundedRect(this.posX + 445, this.posY + 65, 50, 40, 5);
		this.arrowUp.beginFill(0x8c614d);
		this.arrowUp.moveTo(this.posX + 470, this.posY + 70);
		this.arrowUp.lineTo(this.posX + 450, this.posY + 95);
		this.arrowUp.lineTo(this.posX + 490, this.posY + 95);
		this.arrowUp.lineTo(this.posX + 470, this.posY + 70);
		this.arrowUp.events.onInputDown.add(this.turnPage, this);
		this.arrowUp.variable = 'up';
		this.arrowUp.inputEnabled = true;
		this.arrowUp.input.useHandCursor = true;

		this.arrowDown = game.add.graphics();
		this.arrowDown.beginFill(0x4e2010);
		this.arrowDown.drawRoundedRect(this.posX + 445, this.posY + 115, 50, 40, 5);
		this.arrowDown.beginFill(0x8c614d);
		this.arrowDown.moveTo(this.posX + 470, this.posY + 150);
		this.arrowDown.lineTo(this.posX + 450, this.posY + 125);
		this.arrowDown.lineTo(this.posX + 490, this.posY + 125);
		this.arrowDown.lineTo(this.posX + 470, this.posY + 150);
		this.arrowDown.events.onInputDown.add(this.turnPage, this);
		this.arrowDown.variable = 'down';
		this.arrowDown.inputEnabled = true;
		this.arrowDown.input.useHandCursor = true;
		/*
		this.sliderBG = game.add.graphics();
		this.sliderBG.beginFill(0xae8070);
		this.sliderBG.drawRoundedRect(this.posX+480,this.posY+70,10,200,5);

		this.slider = game.add.graphics();
		this.slider.beginFill(0x6e4030);
		this.slider.drawRoundedRect(this.posX+480,this.posY+70+65,10,70,5);
		this.slider.inputEnabled = true;
		this.slider.input.useHandCursor = true; 
		this.slider.input.enableDrag(true);
		this.slider.events.onDragUpdate.add(this.sliderUpdate);
		this.slider.events.onDragStop.add(this.sliderStop);
		*/

		/*
  
		this.userWindow = game.add.graphics();
		this.userWindow.beginFill(0x1e0000);
		this.userWindow.drawRect(this.posX+350,this.posY,150,500);        
		*/
		this.minimize = game.add.graphics();

		this.minimize.beginFill(0x4e2010);
		this.minimize.drawRect(this.posX + 5, this.posY + 5, 50, 50);
		this.minimize.lineStyle(0);
		this.minimize.beginFill(0x8c614d);
		this.minimize.moveTo(this.posX + 10, this.posY + 30);
		this.minimize.lineTo(this.posX + 30, this.posY + 10);
		this.minimize.lineTo(this.posX + 30, this.posY + 50);
		this.minimize.lineTo(this.posX + 10, this.posY + 30);
		this.minimize.drawRect(this.posX + 15, this.posY + 26, 30, 8);
		this.minimize.events.onInputDown.add(this.hide, this);
		this.minimize.inputEnabled = true;
		this.minimize.input.useHandCursor = true;

		this.userBar = [];
		this.Msgcontent = [];
		this.Msgname = [];
		this.Msgline = 0;
		this.offset = 0;
		this.users = [];

		style = { font: "bold 25px Arial", fill: "#f6ebab", align: "center" };
		let index = demo.playerList;
		for (let i = 0; i < index.length; i++) {
			this.users[index[i]] = game.add.text(600, 350 + i * 50, demo.usernameList[index[i]], style);
			this.users[index[i]].alpha = 0;

		}
	},
	userPanel: function () {

	},
	addUser: function () {
		let index = demo.playerList;
		let i = index.length - 1;
		var style = { font: "bold 25px Arial", fill: "#f6ebab", align: "center" };
		this.users[index[i]] = game.add.text(600, 350 + i * 50, demo.usernameList[index[i]], style);

		if (this.users[index[i - 1]].alpha == 0) {
			this.users[index[i]].alpha = 0;
		}

	},
	userOffline: function (i) {
		console.log(i);
		this.users[i].destroy();
	},
	showUserPanel: function () {
		let index = demo.playerList;
		for (let i = 0; i < demo.playerList.length; i++) {

			//game.add.tween(this.users[index[i]]).to({alpha:1},500,'Linear',true,500);
		}
	},
	hideUserPanel: function () {
		let index = demo.playerList;
		for (let i = 0; i < demo.playerList.length; i++) {

			game.add.tween(this.users[index[i]]).to({ alpha: 0 }, 500, 'Linear', true);
		}
	},
	sendMessage: function () {


		if (this.message.value != '') {
			Client.chatroom.sendMessage(user.name, this.message.value);
			this.message.value = '';
		}
	},
	acceptMessage: function (username, message) {
		this.turnClick = this.Msgline - 8;
		if (this.Msgline >= 9) {
			this.userBar[this.Msgline] = game.add.graphics();
			this.userBar[this.Msgline].beginFill(0x8e6050);
			this.userBar[this.Msgline].drawRoundedRect(this.posX + 10, this.posY + 100 - this.offset * 60 + 8 * 60, 430, 30, 5);
			var style = { font: "bold 18px Arial", fill: "#f6ebab", align: "center" };
			this.Msgname[this.Msgline] = game.add.text(this.posX + 20, this.posY + 105 - this.offset * 60 + 8 * 60, username + ':', style);
			style = { font: "18px Arial", fill: "#100000", align: "center" };
			this.Msgcontent[this.Msgline] = game.add.text(this.posX + 30, this.posY + 135 - this.offset * 60 + 8 * 60, message, style);
			//this.slider.height *= 8/9;
			//this.slider.y += (this.posY+70)*8/9;
			for (let i = 0; i < this.Msgline; i++) {
				this.userBar[i].y -= 60;

				this.Msgname[i].y -= 60;

				this.Msgcontent[i].y -= 60;

			}

		} else {
			this.userBar[this.Msgline] = game.add.graphics();
			this.userBar[this.Msgline].beginFill(0x8e6050);
			this.userBar[this.Msgline].drawRoundedRect(this.posX + 10, this.posY + 100 + this.Msgline * 60, 430, 30, 5);
			var style = { font: "bold 18px Arial", fill: "#f6ebab", align: "center" };
			this.Msgname[this.Msgline] = game.add.text(this.posX + 20, this.posY + 105 + this.Msgline * 60, username + ':', style);
			style = { font: "18px Arial", fill: "#100000", align: "center" };
			this.Msgcontent[this.Msgline] = game.add.text(this.posX + 30, this.posY + 135 + this.Msgline * 60, message, style);

		}
		for (let i = 0; i <= this.Msgline; i++) {

			this.userBar[i].mask = this.messageWindow;

			this.Msgname[i].mask = this.messageWindow;

			this.Msgcontent[i].mask = this.messageWindow;
		}
		this.Msgline++;

	},
	showUp: function () {
		this.posX = 0;
		for (let item in this) {
			game.add.tween(this[item]).to({ x: '+500' }, 500, 'Quad.easeInOut', true, 500);
		}
		if (this.Msgline != 0) {
			for (let i = 0; i < this.Msgline; i++) {
				game.add.tween(this.userBar[i]).to({ x: '+500' }, 500, 'Quad.easeInOut', true, 500);
				game.add.tween(this.Msgname[i]).to({ x: '+500' }, 500, 'Quad.easeInOut', true, 500);
				game.add.tween(this.Msgcontent[i]).to({ x: '+500' }, 500, 'Quad.easeInOut', true, 500);
			}
		}

	},
	hide: function () {
		this.posX = -500;
		for (let item in this) {
			game.add.tween(this[item]).to({ x: '-500' }, 500, 'Quad.easeInOut', true, 0);
		}
		if (this.Msgline != 0) {
			for (let i = 0; i < this.Msgline; i++) {
				game.add.tween(this.userBar[i]).to({ x: '-500' }, 500, 'Quad.easeInOut', true, 0);
				game.add.tween(this.Msgname[i]).to({ x: '-500' }, 500, 'Quad.easeInOut', true, 0);
				game.add.tween(this.Msgcontent[i]).to({ x: '-500' }, 500, 'Quad.easeInOut', true, 0);
			}
		}
		demo.HomeMenu.chatIcon.showIcon();
		this.hideUserPanel();
	},
	sliderUpdate: function (item) {
		if (item.x != 500) {
			item.x = 500;
		}
		if (item.y < -60) item.y = -65;
		else if (item.y > 60) item.y = 65;
		if (demo.HomeMenu.chatroom.Msgline > 9) {
			if (item.y < -30) {

				for (let i = 0; i < demo.HomeMenu.chatroom.Msgline; i++) {
					demo.HomeMenu.chatroom.userBar[i].y += 2;
					demo.HomeMenu.chatroom.Msgname[i].y += 2;
					demo.HomeMenu.chatroom.Msgcontent[i].y += 2;
				}
			} else if (item.y > 30) {
				for (let i = 0; i < demo.HomeMenu.chatroom.Msgline; i++) {
					demo.HomeMenu.chatroom.userBar[i].y -= 2;
					demo.HomeMenu.chatroom.Msgname[i].y -= 2;
					demo.HomeMenu.chatroom.Msgcontent[i].y -= 2;
				}
			}
		}

	},
	sliderStop: function (item) {
		if (item.y != 0) item.y = 0;

	},
	turnPage: function (btn) {
		let offset = demo.HomeMenu.chatroom.turnClick + demo.HomeMenu.chatroom.offset;
		if (demo.HomeMenu.chatroom.Msgline > 9) {

			if (btn.variable == 'up' && offset > 0) {
				this.arrowUp.inputEnabled = false;
				this.arrowDown.inputEnabled = false;
				for (let i = 0; i < this.Msgline; i++) {
					game.add.tween(this.userBar[i]).to({ y: '+60' }, 100, 'Linear', true, 0);
					game.add.tween(this.Msgname[i]).to({ y: '+60' }, 100, 'Linear', true, 0);
					game.add.tween(this.Msgcontent[i]).to({ y: '+60' }, 100, 'Linear', true, 0)
						.onComplete.add(function () {
							this.arrowUp.inputEnabled = true;
							this.arrowDown.inputEnabled = true;
						}, this);
				}
				demo.HomeMenu.chatroom.offset--;
			} else if (btn.variable == 'down' && offset >= 0 && offset < demo.HomeMenu.chatroom.turnClick) {
				this.arrowUp.inputEnabled = false;
				this.arrowDown.inputEnabled = false;

				for (let i = 0; i < this.Msgline; i++) {
					game.add.tween(this.userBar[i]).to({ y: '-60' }, 100, 'Linear', true, 0);
					game.add.tween(this.Msgname[i]).to({ y: '-60' }, 100, 'Linear', true, 0);
					game.add.tween(this.Msgcontent[i]).to({ y: '-60' }, 100, 'Linear', true, 0)
						.onComplete.add(function () {
							this.arrowUp.inputEnabled = true;
							this.arrowDown.inputEnabled = true;
						}, this);
				}
				demo.HomeMenu.chatroom.offset++;
			}
		}

		//console.log(btn.variable);
	},

	block: function () { },
};


demo.HomePage.chatIcon = {
	create: function () {
		this.posX = 100;
		this.posY = 100;
		this.Icon = game.add.graphics();
		this.Icon.lineStyle(2, 0x2e0000, 1);
		this.Icon.beginFill(0x8c614d);

		this.Icon.drawCircle(this.posX, this.posY, 60);
		this.Icon.lineStyle(0);
		this.Icon.beginFill(0x2e0000);
		this.Icon.drawRect(this.posX - 16, this.posY - 10, 25, 4);
		this.Icon.drawRect(this.posX - 16, this.posY, 25, 4);
		this.Icon.drawRect(this.posX - 16, this.posY + 10, 25, 4);

		this.Icon.drawCircle(this.posX + 14, this.posY - 8, 6);
		this.Icon.drawCircle(this.posX + 14, this.posY + 2, 6);
		this.Icon.drawCircle(this.posX + 14, this.posY + 12, 6);
		//this.Icon.anchor.setTo(200);

		this.Icon.events.onInputDown.add(this.InputDown, this);
		this.Icon.inputEnabled = true;
		this.Icon.input.useHandCursor = true;
		this.Icon.input.enableDrag(true);
		this.Icon.events.onDragStop.add(this.DragStop);
		this.Icon.events.onInputUp.add(this.hideIcon, this);

		this.Icon.fixedToCamera = true;

	},
	hideIcon: function () {
		this.newposX = this.Icon.x;
		if (this.oldposX == this.newposX) {
			demo.HomePage.chatroom.showUserPanel();
			demo.HomePage.chatroom.showUp();
			game.add.tween(this.Icon).to({ alpha: 0 }, 500, 'Linear', true);
			this.Icon.inputEnabled = false;
			this.Icon.input.useHandCursor = false;

		}
	},
	showIcon: function () {
		game.add.tween(this.Icon).to({ alpha: 1 }, 500, 'Linear', true, 500);
		this.Icon.inputEnabled = true;
		this.Icon.input.useHandCursor = true;
	},
	InputDown: function () {
		this.oldposX = this.Icon.x;
	},
	DragStop: function (item) {
		if (item.x < -60) {
			item.x = -60;
		} else if (item.x > 1460) {
			item.x = 1460;
		}
		if (item.y < -60) {
			item.y = -60;
		} else if (item.y > 665) {
			item.y = 665;
		}
	}
};