var atari1;
var atari2;
var atari3;
var startImg;
var lastSelectedShip=null;
var changeAngleArea;


var GameState = {
    areaStartingX:250,
    areaStartingY:250,

    preload: function(){
        game.load.image('background', 'Flat-Ocean.jpeg');
        this.load.image('rotate', 'rotate.png');
        this.load.image('shipa', 'ship-1.gif');
        this.load.image('shipb', 'ship-2.png');
        this.load.image('shipc', 'ship-3.gif');
        this.load.image('area', 'rotationArea.jpg');
        this.load.image('startButton', 'start.png');

    },
    create:function(){
        this.background= this.game.add.sprite(0,0,'background');



        this.My_Field();
        this.Enemy_Field();

        var that=this;
        changeAngleArea= game.add.sprite(0, 540, 'area');
        changeAngleArea.scale.setTo(0.28);


        startImg = game.add.sprite(500, 130, 'startButton');
        startImg.scale.setTo(0.3);
        atari1= game.add.sprite(270,650, 'shipa');
        atari1.scale.setTo(0.28);
        atari1.anchor.setTo(0.5);
        atari1.angle = 90;
        atari1.inputEnabled = true;
        atari1.input.enableDrag(true);
        atari1.events.onDragStop.add(function(){
            lastSelectedShip=atari1;
            that.calculateShipPosition(atari1);
        },this);


        atari2 = game.add.sprite(400, 640, 'shipb');
        atari2.scale.setTo(0.28);
        atari2.anchor.setTo(0.5);
        atari2.angle= 90;
        atari2.inputEnabled = true;
        atari2.input.enableDrag(true);
        atari2.events.onDragStop.add(function(){
            lastSelectedShip=atari2;
            that.calculateShipPosition(atari2);
        },this);

        atari3 = game.add.sprite(300, 640, 'shipc');
        atari3.scale.setTo(0.13);
        atari3.anchor.setTo(0.5);
        atari3.inputEnabled = true;
        atari3.input.enableDrag(true);
        this.background.inputEnabled = true;
        this.background.input.pixelPerfectClick = true;
        atari3.events.onDragStop.add(function(){
            lastSelectedShip=atari3;
            that.calculateShipPosition(atari3);
        },this);


        var ro = game.add.sprite(200, 650, 'rotate');
        ro.scale.setTo(0.1);
        ro.inputEnabled = true;
        ro.events.onInputDown.add(this.rotateShip, this);
        var my_field = game.add.text(300, 190, "MY_Field", { font: "32px Arial", fill: "green" });
        var enemy = game.add.text(650, 190, "ENEMY_Field", { font: "32px Arial", fill: "red" });
        //var text1 = game.add.text(248, 230, "A0   A1   A2   A3   A4   A5   A6   A7   A8   A9", { font: "16px Arial", fill: "black" });

        //var text2 = game.add.text(225, 250, 'B0', {font: "18px Arial", fill: "black"});
        //text2.parseList(swords);

    },

    rotateShip:function(){
        if(lastSelectedShip!=null){
            if(lastSelectedShip.x>=changeAngleArea.x && lastSelectedShip.x<=(changeAngleArea.x+changeAngleArea.width) &&  lastSelectedShip.y>=changeAngleArea.y && lastSelectedShip.y<=(changeAngleArea.y+changeAngleArea.height)){
                //lastSelectedShip.anchor.setTo(0.5);
                lastSelectedShip.angle += 90;
                console.log("yes rotate now");
            }
            else{
                console.log("Dock ship at platform to rotate");
            }
        }else{
            console.log("No ship selected");
        }

    },

    calculateShipPosition:function(ship) {

        console.log(ship);
        console.log(JSON.stringify(this.matrixData));


        var x_axis2 = {1:"A0",2:"A1", 3:"A2" ,4:"A3", 5:"A4",6:"A5",7:"A6",8:"A7",9:"A8", 10:"A9"};
        var x_axis1 = {0:"A0",1:"A1", 2:"A2" ,3:"A3", 4:"A4",5:"A5",6:"A6",7:"A7",8:"A8", 9:"A9"};
        var y_axis2 = {1:"B0",2:"B1", 3:"B2", 4:"B3", 5:"B4",6:"B5",7: "B6",8: "B7", 9:"B8",10:"B9"};
        var y_axis1 = {0:"B0",1:"B1", 2:"B2", 3:"B3", 4:"B4",5:"B5",6: "B6",7: "B7", 8:"B8",9:"B9"};
        console.log(atari3.angle);

        var ship1x_end = atari1.x +  atari1.width;
        var value1A_start = parseInt(( atari1.x - this.areaStartingX) / 31.8);
        var value1A_end = parseInt((ship1x_end - this.areaStartingY) / 31.8);
        var ship1y_end=  atari1.y+ atari1.width;
        var value1B_start = parseInt(( atari1.y - this.areaStartingY) / 31.8);
        var value1B_end =parseInt((ship1y_end-this.areaStartingY)/31.8);

        var array_Ship1;

        if (atari1.angle == 90 || atari1.angle== -90) {

             array_Ship1 =[x_axis1[value1A_start] ,y_axis2[value1B_start] ,y_axis2[value1B_end]];

            console.log(array_Ship1);

        }
        if (atari1.angle == 180 || atari1.angle == -180 || atari1.angle == 0){

            array_Ship1 =[y_axis1[value1B_start] ,x_axis2[value1A_start] ,x_axis2[value1A_end]];
            console.log(array_Ship1);

        }




        var ship2x_end = atari2.x +  atari2.width;
        var ship2y_end=  atari2.y+ atari2.width;
        var value2A_start = parseInt(( atari2.x - 250) / 31.8);
        var value2A_end = parseInt((ship2x_end - 250) / 31.8);
        var value2B_start = parseInt(( atari2.y - 250) / 31.8);
        var value2B_end =parseInt((ship2y_end-250)/31.8);

        var x_axis_start2 = {2:"A0",3:"A1", 4:"A2" ,5:"A3", 6:"A4",7:"A5"};
        var x_axis_start2a = {0:"A0",1:"A1" ,2:"A2",3:"A3", 4:"A4" ,5:"A5", 6:"A6",7:"A7" , 8 : "A8" ,9: "A9"};
        var x_axis_end2 = {3:"A4",4:"A5",5:"A6",6:"A7",7:"A8", 8:"A9"};
        var y_axis_start2 = {2:"B0",3:"B1", 4:"B2" ,5:"B3", 6:"B4",7:"B5"};
        var y_axis_start2a = {0:"B0",1:"B1" ,2:"B2",3:"B3", 4:"B4" ,5:"B5", 6:"B6",7:"B7" , 8 : "B8" ,9: "B9"};
        var y_axis_end2 = {3:"B4",4:"B5",5:"B6",6:"B7",7:"B8", 8:"B9"};


        var array_ship2;
        if (atari2.angle == 90 || atari2.angle== -90) {

            array_ship2=[y_axis_start2a[value2B_start],x_axis_start2[value2A_start],x_axis_end2[value2A_end]];
            console.log(array_ship2);


        }
        if (atari2.angle == 180 || atari2.angle == -180 || atari2.angle == 0) {

            array_ship2 = [x_axis_start2a[value2A_start], y_axis_start2[value2B_start], y_axis_end2[value2B_end]];
            console.log(array_ship2);
        }




        var ship3x_end = atari3.x +  atari3.width;
        var ship3y_end=  atari3.y+ atari3.width;
        var value3A_start = parseInt(( atari3.x - 250) / 31.8);
        var value3A_end = parseInt((ship3x_end - 250) / 31.8);
        var value3B_start = parseInt(( atari3.y - 250) / 31.8);
        var value3B_end =parseInt((ship3y_end-250)/31.8);


        var x_axis_start3 = {2:"A0",3:"A1", 4:"A2" ,5:"A3", 6:"A4",7:"A5" ,8:"A6"};
        var x_axis_start3A = {0:"A0", 1:"A1",2:"A2",3:"A3", 4:"A4" ,5:"A5", 6:"A6",7:"A7" ,8:"A8",9:"A9"};
        var x_axis_end3 = {3:"A3",4:"A4",5:"A5",6:"A6",7:"A7",8:"A8", 9:"A9"};
        var y_axis_start3 ={2:"B0",3:"B1", 4:"B2" ,5:"B3", 6:"B4",7:"B5" ,8:"B6"};
        var y_axis_start3B = {0:"B0", 1:"B1",2:"B2",3:"B" + "3", 4:"B4" ,5:"B5", 6:"B6",7:"B7" ,8:"B8",9:"B9"};
        var y_axis_end3 = {3:"B3",4:"B4",5:"B5",6:"B6",7:"B7",8:"B8", 9:"B9"};
            var array_ship3;
        if (atari3.angle == 90 || atari3.angle== -90) {

             array_ship3 =[y_axis_start3B[value3B_start] ,x_axis_start3[value3A_start],x_axis_end3[value3A_end] ];
            console.log(array_ship3);



        }
        if (atari3.angle == 180 || atari3.angle == -180 || atari3.angle == 0) {

            array_ship3 =[x_axis_start3A[value3A_start],y_axis_start3[value3B_start],y_axis_end3[value3B_end]];
            console.log(array_ship3);


        }

    },

    matrixData:{
        x:0 ,
        y:0,
        width:0,
        height:0
    },
    My_Field:function(){

        var canvasZoom = 32;
        var spriteWidth = 10;
        var spriteHeight = 10;
        var canvasBG;
        var canvasSprited;
        var canvasGrid;

        var matGrid=game.create.grid('drawingGrid', 16 * canvasZoom, 16 * canvasZoom, canvasZoom, canvasZoom, 'rgba(0,191,243,0.8)');

        canvas = game.make.bitmapData(spriteWidth * canvasZoom, spriteHeight * canvasZoom);
        canvasBG = game.make.bitmapData(canvas.width + 2, canvas.height + 2);

        canvasBG.rect(0, 0, canvasBG.width, canvasBG.height, '#fff');
        canvasBG.rect(1, 1, canvasBG.width - 2, canvasBG.height - 2, '#3f5c67');


        x= this.areaStartingX;
        y=this.areaStartingY;
        canvasBG.addToWorld(x, y);
        canvasSprite = canvas.addToWorld(x +1, y+1);
        canvasGrid = game.add.sprite(x +1, y +1, 'drawingGrid');
        canvasGrid.crop(new Phaser.Rectangle(0, 0, spriteWidth * canvasZoom, spriteHeight * canvasZoom));


        this.matrixData.width=matGrid.width;
        this.matrixData.height=matGrid.height;

    },

    Enemy_Field:function(){

        var canvasZooma = 32;
        var spriteWidtha = 10;
        var spriteHeighta = 10;
        var canvasBGa;
        var canvasSprite2;
        var canvasGrid2;

    game.create.grid('drawingGrida', 16 * canvasZooma, 16 * canvasZooma, canvasZooma, canvasZooma, 'rgba(0,191,243,0.8)');

    canvas = game.make.bitmapData(spriteWidtha * canvasZooma, spriteHeighta * canvasZooma);
    canvasBGa = game.make.bitmapData(canvas.width + 2, canvas.height + 2);

    canvasBGa.rect(0, 0, canvasBGa.width, canvasBGa.height, '#fff');
    canvasBGa.rect(1, 1, canvasBGa.width - 2, canvasBGa.height - 2, '#3f5c67');

    var x_1 = 600;
    var y_1 = 250;

    canvasBGa.addToWorld(x_1, y_1);
    canvasSprite2 = canvas.addToWorld(x_1 + 1, y_1 + 1);
    canvasGrid2 = game.add.sprite(x_1 + 1, y_1 + 1, 'drawingGrida');
    canvasGrid2.crop(new Phaser.Rectangle(0, 0, spriteWidtha * canvasZooma, spriteHeighta * canvasZooma));

},
    update: function(){
    },


    render:function() {

        game.debug.spriteInputInfo(this.background, 32, 32);
        game.debug.geom(this.background.input._tempPoint);

    }


};

var game = new Phaser.Game(1000, 700, Phaser.AUTO );
game.state.add('GameState', GameState);
game.state.start('GameState');