'use strict'
const game = new Phaser.Game(
  /*game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameArea'); */
  window.innerWidth * window.devicePixelRatio, //888
  window.innerHeight * window.devicePixelRatio, //99
  Phaser.Auto, '', {
    preload,
    create,
    update

  }
);

let cursors;
let deathCount = 0;
let player;
let groundLayer;
let groundLayer2;

let lastCheckPointX = 50;
let lastCheckPointY = 300;
var boolDie = 0;
let textDie;
var dieSound;
var music;
var keyM;
var keyN;
var keyV;
var keyB;
var Mcount = 0;

let Bcount = 0;
var win = 0;
var playDieSound = true;
var checkPointSound;
var playCheckPointSound;

var textWin;
let winSound;
let startTimer = 0;
let timerDiff = 0;
let xChangePL;
let yChangePL;
let imgMClick = false;
let imgNClick = false;
let imgVClick = false;
let imgBClick = false;
let Vcount = 0;

let velocityCheck = false;
let checkpointerText1;
let checkpointerText2;
let textThanks;
var imgB;

var imgN;

var imgM;

var imgV;


var gravityNum = 10000;



var buttonPause;






function preload() {
  game.load.tilemap('tilemap', '1.json', null, Phaser.Tilemap.TILED_JSON) ///зареждаме картата ключ, пътя до картата
  game.load.image('tileset', '32x32_tileset_mario.png'); ///зареждане на тайлсета във фейзър
  game.load.tilemap('tilemap2', '2.json', null, Phaser.Tilemap.TILED_JSON)
  game.load.image('tileset2', '32x32_tileset_mario.png');
  game.load.image('M', 'buttonM.png');
  game.load.image('N', 'buttonN.png');
  game.load.image('B', 'buttonB.png');

  game.load.image('buttonPause', 'buttonPause.png');
  //game.load.image('buttonMap', 'buttonMap.png');

  game.load.image('V', 'buttonV.png');
  game.load.spritesheet('pl', 'bird.png', 600 / 4, 100 / 1);
  game.load.spritesheet('pl2', 'bird2.png', 904 / 4, 176 / 1);
  game.load.spritesheet('pl3', 'bird3.png', 600 / 4, 200 / 2);

  game.load.audio('music', 'Music1.mp3');
  game.load.audio('music2', 'Music2.mp3');
  game.load.audio('music3', 'Music3.mp3');
  game.load.audio('music4', 'Music4.mp3');
  game.load.audio('music5', 'Music5.mp3');
  game.load.audio('die', 'Die.m4a');
  game.load.audio('WinSound', 'Win.mp3');
  game.load.audio('checkPointSound', 'checkpoint.mp3');

}


function create() {
  game.forceSingleUpdate = true;
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
  game.scale.pageAlignHorizontally = true; 
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = "#983246";
  createMap();
  createMap2();

  createPlayer();
  addTexts();
  createButtonIMG();

  music = game.sound.play('music');
  music.loopFull(100);
  music.volume = 0.5;

  cursors = game.input.keyboard.createCursorKeys();
  game.world.setBounds(0, 0, 24000, window.innerHeight * devicePixelRatio);
  game.camera.follow(player);
  keyM = game.input.keyboard.addKey(Phaser.Keyboard.M);
  keyN = game.input.keyboard.addKey(Phaser.Keyboard.N);
  keyB = game.input.keyboard.addKey(Phaser.Keyboard.B);
  keyV = game.input.keyboard.addKey(Phaser.Keyboard.V);
  cursors = game.input.keyboard.createCursorKeys();
 

}


function update() {
  checkPoints();
  deathCountText();
  ifWinText();
  distanceTextUpdate();
  ifDieText();
  if (startTimer != 0) {
    gameClockText();
  }
  movement();
  dying();
}


const StartMenu = function () {

}


//functions:
const addTexts = function () {
  textDie = game.add.text(-200, 20, 'You DIED', {
    font: '60pt Revalia'
  });
  textDie.anchor.setTo(0.5);

  textWin = game.add.text(10, 6000, 'You WIN', {
    font: '75pt Revalia'
  });
  textWin.anchor.setTo(0.5);

  /* textThanks = game.add.text(24000- window.innerWidth * window.devicePixelRatio/2, 485, 'THANKS FOR PLAYING! :)', {
     font: '70pt Arial'
   });
   textThanks.anchor.setTo(0.5);*/

}
const createPlayer = function () {
  if (Vcount == 0) {
    player = game.add.sprite(50, 300, 'pl');
  } else {
    if (player.body.velocity.x > 0) {
      velocityCheck = true
    } else {
      velocityCheck = false
    }
    xChangePL = player.x;
    yChangePL = player.y;
    player.kill();

    player = game.add.sprite(xChangePL, yChangePL, 'pl');

    game.camera.follow(player);
  }
  player.scale.setTo(0.27);
  game.physics.enable(player);
  player.body.setCircle(38);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = gravityNum;
  if (velocityCheck == true) {
    player.body.velocity.x = 200;
  }
  player.animations.add('animation', [0, 1, 2, 3], 20, true);
}
const createPlayer2 = function () {
  if (player.body.velocity.x > 0) {
    velocityCheck = true
    yChangePL = player.y;
  } else {
    velocityCheck = false
    yChangePL = player.y - 10;
  }
  xChangePL = player.x;

  player.kill();
  player = game.add.sprite(xChangePL, yChangePL, 'pl2');
  game.camera.follow(player);
  player.scale.setTo(0.17);
  game.physics.enable(player);
  if (velocityCheck == true) {
    player.body.velocity.x = 200;
  }
  player.body.setCircle(76);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = gravityNum;
  player.animations.add('animation', [], 4, true);
}
const createPlayer3 = function () {
  if (player.body.velocity.x > 0) {
    velocityCheck = true
    yChangePL = player.y;
  } else {
    velocityCheck = false
    yChangePL = player.y - 10;
  }
  xChangePL = player.x;

  player.kill();
  player = game.add.sprite(xChangePL, yChangePL, 'pl3');
  game.camera.follow(player);
  player.scale.setTo(0.33);
  game.physics.enable(player);
  if (velocityCheck == true) {
    player.body.velocity.x = 200;
  }
  player.body.setCircle(34);
  player.body.collideWorldBounds = true;
  player.body.gravity.y = gravityNum;
  player.animations.add('animation', [], 16, true);
}
const createMap = function () {
  const map = game.add.tilemap('tilemap'); //създаваме я като променлива, името го взимаме от load
  groundLayer = map.createLayer(0);
  map.addTilesetImage('32x32_tileset_mario', 'tileset')
  map.createLayer('\u0421\u043b\u043e\u0439 \u0441 \u043f\u043b\u043e\u0447\u043a\u0438 2');
  map.createLayer('\u0421\u043b\u043e\u0439 \u0441 \u043f\u043b\u043e\u0447\u043a\u0438 3');
  map.setCollisionByExclusion([]);


}
const createMap2 = function () {
  const map2 = game.add.tilemap('tilemap2') //създаваме я като променлива, името го взимаме от load
  groundLayer2 = map2.createLayer(0);
  map2.addTilesetImage('32x32_tileset_mario', 'tileset2')
  map2.setCollisionByExclusion([]);
}

const movement = function () {
  

  if ((cursors.up.isDown) && player.x < 4000) {
    // imgUPClick = false;
    player.body.velocity.y = -500;
    player.body.velocity.x = 200;
    player.animations.play('animation');
    if (startTimer < 3) {
      startTimer++;
      // gameClockText();
    }
    playCheckPointSound = true;

  } else if (cursors.up.isDown) {
    //imgUPClick = false;
    player.body.velocity.y = -400;
    player.body.velocity.x = 200;
    player.animations.play('animation');

    playCheckPointSound = true;

  } else if (cursors.down.isDown) {
    //imgDownClick = false;
    player.body.velocity.y = 500;
  } else {
    // imgDownClick = false;
    player.body.velocity.y = 0;
  }
}

const createButtonIMG = function () {
  imgB = game.add.button(window.innerWidth * window.devicePixelRatio / 2 - 100, window.innerHeight * window.devicePixelRatio - 105, 'B', null, this, 0, 1, 0, 1);
  imgB.anchor.setTo(1, 0);
  imgB.width = 100;
  imgB.height = 100;
  imgB.fixedToCamera = true;
  imgB.events.onInputUp.add(function () {});
  imgB.events.onInputDown.add(function () {
    soundChange();
  });

  imgM = game.add.button(window.innerWidth * window.devicePixelRatio / 2, window.innerHeight * window.devicePixelRatio - 105, 'M', null, this, 0, 1, 0, 1);
  imgM.anchor.setTo(1, 0);
  imgM.width = 100;
  imgM.height = 100;
  imgM.fixedToCamera = true;
  imgM.events.onInputUp.add(function () {});
  imgM.events.onInputDown.add(function () {
    muteMusic();
  });

  imgN = game.add.button(window.innerWidth * window.devicePixelRatio / 2 + 100, window.innerHeight * window.devicePixelRatio - 105, 'N', null, this, 0, 1, 0, 1);
  imgN.width = 100;
  imgN.height = 100;
  imgN.fixedToCamera = true;
  imgN.events.onInputUp.add(function () {});
  imgN.events.onInputDown.add(function () {
    game.stage.backgroundColor = Phaser.Color.getRandomColor(50, 255, 255);
  });


  imgV = game.add.button(window.innerWidth * window.devicePixelRatio / 2, window.innerHeight * window.devicePixelRatio - 105, 'V', null, this, 0, 1, 0, 1);
  imgV.width = 100;
  imgV.height = 100;
  imgV.fixedToCamera = true;
  imgV.events.onInputUp.add(function () {});
  imgV.events.onInputDown.add(function () {
    PlayerChange();
  });
  buttonPause = game.add.button(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio / 2 + 70, 'buttonPause', null, this, 0, 1, 0, 1);
  buttonPause.width = 100;
  buttonPause.height = 100;
  buttonPause.anchor.setTo(1, 0);
  buttonPause.fixedToCamera = true;
  buttonPause.events.onInputUp.add(function () {});
  buttonPause.events.onInputDown.add(function () {
    game.gamePaused()
    PauseMenu();
  });

}

var positionPauseM = 0;
const PauseMenu = function () {
  
}

const PlayerChange = function () {

  Vcount++;

  if (Vcount % 3 == 1) {
    createPlayer2();
  } else if (Vcount % 3 == 2) {
    createPlayer3();
  } else {
    createPlayer();
  }
}
const muteMusic = function () {

  Mcount++;
  if (Mcount % 2 == 1) {
    game.sound.mute = true;
    //  underMapText4.text = 'M - unmute music';
    music.volume = 0;
    playDieSound = false;

  } else {
    // underMapText4.text = 'M - mute music';
    game.sound.mute = false;
    music.loop = true;
    playDieSound = true;
  }
}
const checkPoints = function () {
  game.physics.arcade.collide(player, groundLayer2, function (player, groundLayer2) {
    player.body.velocity.x = 0;
    lastCheckPointX = player.x - 8;
    lastCheckPointY = player.y - 3;
    player.animations.stop();
    player.frame = 0;
    if (playCheckPointSound) {
     
      checkPointSound = game.sound.play('checkPointSound');
      playCheckPointSound = false;
    }
   
  });
}
const dying = function () {
  game.physics.arcade.collide(player, groundLayer, function (player, groundLayer) {
    player.x = lastCheckPointX;
    player.y = lastCheckPointY;
    deathCount++;
    boolDie = 1;
    playCheckPointSound = false;
    if (playDieSound == true) {
      dieSound = game.sound.play('die');
    }
  });
}
const ifWinText = function () {
  if (player.x > 23800 && win < 1000) {

    textWin.x = 23200;
    textWin.y = 300;
    textWin.text = 'You WIN!!!';
    win++;
    winStopClock = true;
    textWin.anchor.setTo(0.5);
    //textThanks.anchor.setTo(0.5);
    //  textThanks.text= 'THANKS FOR PLAYING! :)';

    if (win == 2 && playDieSound == true) {
      game.camera.shake(0.01, 1000, true, Phaser.Camera.SHAKE_BOTH, true);
      winSound = game.sound.play('WinSound');
      winSound.volume = 2;
    }
  }
}
const ifDieText = function () {
  if (boolDie < 60 && boolDie > 0) {
    if (lastCheckPointX < 500) {
      textDie.x = window.innerWidth * window.devicePixelRatio / 2;
    } else {
      textDie.x = player.x;
    }
    textDie.y = 200;
    boolDie++;
  } else {
    textDie.x = -200;
    boolDie = 0;
  }
}
const deathCountText = function () {
  
}

const gameClockText = function () {
 
}
const soundChange = function () {
  game.sound.mute = false;
  Bcount++;
  Mcount = 0;
  if (Bcount % 5 == 1) {
    music.stop('music');
    music = game.sound.play('music2');
    music.loopFull(100);
  } else if (Bcount % 5 == 2) {
    music.stop('music2');
    music = game.sound.play('music3');
    music.loopFull(100);
    // music.loop = true;
  } else if (Bcount % 5 == 3) {
    music.stop('music3');
    music = game.sound.play('music4');
    music.loopFull(100);
    // music.loop = true;
  } else if (Bcount % 5 == 4) {
    music.stop('music4');
    music = game.sound.play('music5');
    music.loopFull(100);
    // music.loop = true;
  } else {
    music.stop('music5');
    music = game.sound.play('music');
    music.loopFull(100);
  }
}
const distanceTextUpdate = function () {
 
}