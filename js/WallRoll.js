    var game = new Phaser.Game(640, 520, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    })

    function preload() {
        game.load.image('bg', 'assets/images/WallRoll/bg_640_520.png');
        game.load.image('hgl', 'assets/images/WallRoll/hgl.png');
        game.load.image('vgl', 'assets/images/WallRoll/vgl.png');
        game.load.image('dead', 'assets/images/WallRoll/dead_60_60.png');
        game.load.image('living', 'assets/images/WallRoll/living_60_60.png');
        game.load.image('one', 'assets/images/WallRoll/one_100_100.png');
        game.load.image('two', 'assets/images/WallRoll/two_100_100.png');
        game.load.image('three', 'assets/images/WallRoll/three_100_100.png');
        game.load.image('four', 'assets/images/WallRoll/four_100_100.png');
        game.load.image('five', 'assets/images/WallRoll/five_100_100.png');
        game.load.image('six', 'assets/images/WallRoll/six_100_100.png');
        game.load.spritesheet('die', 'assets/images/WallRoll/dicesheet.png', 66.4, 66.4);
    }


    var idie, frame, fno, hit = 0,
        noHit = 0;
    var ctimer, result, correct;
    var bmd;
    var answer = [],
        playerans = [];
    var storeFnoOnHit = [];
    var noTouchFrame = [];
    var i;
    var level = 1;
    var input;
    var x = 0,
        y = 150;
    var clevel = 1;
    var life = 3;
    var ok = 0;
    var myscore, score = 0;
    var mylevel;
    var ia, ib, ic, id, ie, ig;

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE); // start phaser's arcade physics
        game.add.sprite(0, 0, 'bg'); // adding background 'bg' to game area
        for (var i = 0; i < 3; i++) {
            game.add.sprite(258 + (40 * i), 475, 'living');
        }

        frame = game.add.group(); //  made a group = frame
        frame.enableBody = true; //  enable physics on group frame
        var line_v1 = frame.create(0, 513, 'hgl'); // line_v1 is a vertical line and a frame member
        line_v1.body.immovable = true;
        var line_v2 = frame.create(0, 0, 'hgl');
        line_v2.body.immovable = true;
        var line_h1 = frame.create(0, 0, 'vgl'); // line_h1 is a horizontal line and a frame member
        line_h1.body.immovable = true;
        var line_h2 = frame.create(632, 0, 'vgl');
        line_h2.body.immovable = true;

        timer = game.add.text(505, 19, '00:00', {
            font: "15px Arial",
            fill: "white"
        }); //Adding timer text to game area
        myscore = game.add.text(90, 19, '000', {
            font: "15px Arial",
            fill: "white"
        }); //Adding score text field
        mylevel = game.add.text(312, 19, '01', {
            font: "15px Arial",
            fill: "white"
        }); //Adding level text field

        die_create();
        timer_create();
    }

    function die_create() {
        idie = game.add.sprite(100, game.world.height - 250, 'die'); //adding die to game area
        game.physics.arcade.enable(idie); // enabling phsics on die
        idie.body.collideWorldBounds = true;
        idie.body.bounce.y = 1;
        idie.body.bounce.x = 1;
        idie.body.velocity.y = -250; // die movement
        idie.body.velocity.x = 150;
    }

    function timer_create() { //create 8 second timer for die
        ctimer = game.time.create(true);
        ctimer.loop(8000, make_invisible, idie);
        ctimer.start();
    }

    function make_invisible() {
        idie.kill(); //kill die after 8 seconds
        ctimer.stop();
        answer[level - 1] = storeFnoOnHit[storeFnoOnHit.length - 1] + 1; //store last die result in answer
        console.log("answer =" + answer[level - 1]);
        rdisplay();
    }

    function rdisplay() {
        result = game.add.text(35, 100, 'PLEASE ENTER THE DIE RESULT', {
            font: "35px Arial",
            fill: "green"
        });
        clevel = 1;
        x = 0, y = 150;
        ok = 0;
        input_create(); //create user input after result display
    }

    function input_create() {
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key1.onDown.add(add1, this);
        key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        key2.onDown.add(add2, this);
        key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        key3.onDown.add(add3, this);
        key4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
        key4.onDown.add(add4, this);
        key5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        key5.onDown.add(add5, this);
        key6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
        key6.onDown.add(add6, this);
    }

    function add1() {
        if (clevel <= level) {
            playerans[clevel - 1] = 1;
            check_xy();
            ia = game.add.sprite(x, y, 'one');
            clevel++;
        } else check_panswer();
    }

    function add2() {
        if (clevel <= level) {
            playerans[clevel - 1] = 2;
            check_xy();
            ib = game.add.sprite(x, y, 'two');
            clevel++;
        } else check_panswer();
    }

    function add3() {
        if (clevel <= level) {
            playerans[clevel - 1] = 3;
            check_xy();
            ic = game.add.sprite(x, y, 'three');
            clevel++;
        } else check_panswer();
    }

    function add4() {
        if (clevel <= level) {
            playerans[clevel - 1] = 4;
            check_xy();
            id = game.add.sprite(x, y, 'four');
            clevel++;
        } else check_panswer();
    }

    function add5() {
        if (clevel <= level) {
            playerans[clevel - 1] = 5;
            check_xy();
            ie = game.add.sprite(x, y, 'five');
            clevel++;
        } else check_panswer();
    }

    function add6() {
        if (clevel <= level) {
            playerans[clevel - 1] = 6;
            check_xy();
            ig = game.add.sprite(x, y, 'six');
            clevel++;
        } else check_panswer();
    }

    function check_xy() { // for answer indentation on game screen
        if (x === 560) {
            x = 40;
            y += 40;
        } else x += 40;
    }

    function check_panswer() { // check final answer entered by user

        for (var i = 0; i < level; i++) {
            //console.log(playerans[i]);
            //console.log(answer[i]);
            if (answer[i] === playerans[i]) {
                ok++;
                //console.log("ok :"+ ok);
            }

        }


        if (ok == level) {
            level++;
            score += 27;
            result.destroy();
            for (var i = 0; i < level; i++) {
                if (playerans[i] === 1) {
                    ia.destroy(); //destroy answer sprites from screen
                } else if (playerans[i] === 2) {
                    ib.destroy();
                } else if (playerans[i] == 3) {
                    ic.destroy();
                } else if (playerans[i] === 4) {
                    id.destroy();
                } else if (playerans[i] === 5) {
                    ie.destroy();
                } else if (playerans[i] === 6) {
                    ig.destroy();
                }
            }

            //console.log(level);
            nw_lvl();
        } else reduce_life();
        update_level();
        update_score();
    }

    function update_level() {

        if (level < 10) {
            mylevel.setText('0' + level);
        } else {
            mylevel.setText(level);
        }
    }

    function update_score() {

        if (score < 100) {
            displayScore = '0' + score;
        } else {
            displayScore = score;
        }
        myscore.setText(displayScore);
    }

    function reduce_life() {
        life--;
        if (life < 0) {
            game_over();
        }
        if (life > -1) {
            game.add.sprite(258 + (40 * life), 475, 'dead');
        }
    }

    function game_over() {
        game.add.text(150, 260, 'GAME OVER', {
            font: "50px Arial",
            fill: "green"
        });
    }

    function nw_lvl() {
        die_create();
        timer_create();
    }

    function update() {
        if (game.physics.arcade.collide(idie, frame)) {
            hit++;
            //console.log("hit = "+hit);
            fno = Math.floor(Math.random() * 6);
            storeFnoOnHit[hit - 1] = fno;
            console.log("storeFnoOnHit's value at=" + storeFnoOnHit[hit - 1]);
            idie.animations.add('touch_bounds', [storeFnoOnHit[hit - 1]], 10, true, true);
            idie.animations.play('touch_bounds');
        } else {
            if (hit == 0) {
                noHit++;
                fno = Math.floor(Math.random() * 6);
                //console.log("noHit = "+noHit);
                noTouchFrame[noHit - 1] = fno;
                //console.log("noTouchFrame's vale ="+ noTouchFrame[noHit-1]);
                //var temp = noTouchFrame[0];
                idie.animations.add('b4_touch_bounds', [noTouchFrame[0]], 10, true, true);
                idie.animations.play('b4_touch_bounds');
            } else {
                var temp1 = storeFnoOnHit[hit - 1];
                //console.log("temp1's vale ="+temp1);
                idie.animations.add('no_touch_bounds', [temp1], 10, true, true);
                idie.animations.play('no_touch_bounds');
            }
        }
        updateTimer();
    }


    //The following variables and function will be used to take control over the timer
    var timer;
    var totalSeconds = 0;
    var gameSeconds = 0;
    var timePaused = 0;
    var timeUpdateFlag = 1;
    var pauseState = 0;
    var finishFlag = 0;


    var startGame = 1; //To be changed to zero after we include startinggame function.
    var timeText;
    // The userdefined function to update the timer.
    function updateTimer() {
        if (startGame === 1) {
            //To find and display the elapsed time.
            if (pauseState === 0) {
                if (timeUpdateFlag === 0) {
                    timeUpdateFlag = 1;
                    timePaused = timePaused + (Math.floor(game.time.totalElapsedSeconds()) - totalSeconds);
                }
                totalSeconds = Math.floor(game.time.totalElapsedSeconds());
                gameSeconds = totalSeconds - timePaused;
                var minutes = Math.floor(gameSeconds / 60);
                var hours = Math.floor(minutes / 60);
                var modmin = minutes % 60;
                if (modmin < 10) {
                    modmin = '0' + modmin;
                }
                var modsec = gameSeconds % 60;
                if (modsec < 10) {
                    modsec = '0' + modsec;
                }
                //Hour display in two digits ! will be like 002.
                timeText = '0' + hours + ':' + modmin + ':' + modsec;
                timer.setText(timeText);
            } else {
                timeUpdateFlag = 0
            }
            if (gameSeconds > 59) {
                if (finishFlag === 0) {
                    /*document.getElementById("finishButtonArea").innerHTML = '<paper-ripple></paper-ripple><paper-button raised style="color:#e91e63" onclick="finishGame()">Click here to finish the game</paper-button>';*/
                    finishFlag = 1;
                }
            }
        }
    }