const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const World = Matter.World;
const Constraint = Matter.Constraint;

var engine,world;
var ground,stand1,stand2;
var boxes1=[],boxes2=[],box1,box2;
const polygon = Bodies.circle(200,200,20,{isStatic:true});
var polygonImg;
var sling;
var gameState = "onSling";
var time;
var score = 0;

function preload(){
    polygonImg = loadImage("polygon.png");
}

function setup(){
    var canvas = createCanvas(1600,600);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(800,590,1600,20);
    stand1 = new Ground(700,450,450,20);
    stand2 = new Ground(1250,300,350,20);

    //1st pyramid

    for( var i=0;i<15;i++){
        if(i<7){
            boxes1[i] = new Box(545+i*50,420,50,60,"#86CDE9");
        } else if(i>=7 && i<12){
            boxes1[i] = new Box(595+(i-7)*50,360,50,60,"#FEBFCA");
        } else if(i>=12 && i<15){
            boxes1[i] = new Box(645+(i-12)*50,300,50,60,"#3EDFCF");
        }
    }

    box1 = new Box(695,240,50,60,"white");

    //2nd pyramid

    for( var i=0;i<8;i++){
        if(i<5){
            boxes2[i] = new Box(1150+(i)*50,270,50,60,"#86CDE9");
        } else if(i>4 && i<8){
            boxes2[i] = new Box(1200+(i-5)*50,230,50,60,"#FEBFCA");
        }
    }

    box2 = new Box(1250,170,50,60,"#3EDFCF");

    //polygon
    polygon.body = Bodies.circle(215,375,40,{isStatic:false,density:1});
    World.add(world,polygon.body);

    sling = new SlingShot(polygon.body,{x:215,y:375});
}

function draw(){
    getTime();
    if(time==="day"){

        background("#c34500");

    }else if(time==="night"){

        background("#362A2A");

    }

    Engine.update(engine);

    ground.display();
    stand1.display();
    stand2.display();

    for( var i=0;i<15;i++){
        boxes1[i].display();
        boxes1[i].score();
    }

    box1.display();
    box1.score();

    for( var i=0;i<8;i++){
        boxes2[i].display();
        boxes2[i].score();
    }

    box2.display();
    box2.score();

    imageMode(CENTER);
    image(polygonImg,polygon.body.position.x,polygon.body.position.y,100,100);

    sling.display();
    textSize(30);
    stroke("white");
    strokeWeight(3);
    fill("white");
    text("Score : "+score,75,100);

}

function mouseDragged(){
    if(gameState==="onSling"){
        Body.setPosition(polygon.body,{x:mouseX,y:mouseY});
    }
}

function mouseReleased(){
    sling.fly();
    gameState = "released";
}

function keyPressed(){
    if(keyCode == 32 && gameState === "released"){
        Body.setPosition(polygon.body,{x:215,y:375})
        sling.attach(polygon.body);
        gameState = "onSling";
    }
}

async function getTime(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    if(hour>06 && hour<18){
        time = "day";
    }else if(hour<06 && hour>18){
        time = "nigth";
    }
}