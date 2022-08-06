song1="";
song2="";
song1_status="";
song2_status="";
rightwristX=0;
rightwristY=0;
leftwristX=0;
leftwristY=0;
scorerightwrist=0;
scoreleftwrist=0;


function preload() {
    song1=loadSound("music.mp3"); 
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600,500);
  canvas.center();
  video=createCapture(VIDEO);
  video.hide();

  posenet=ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
}

function draw() {
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    fill('blue');
    stroke('voilet');
   
    if (scorerightwrist>0.2) {
        circle(rightwristX,rightwristY,20);
        song2.stop();
        if (song1_status==false) {
          song1.play();
          document.getElementById("song").innerHTML="Playing Harry Potter THEME SONG" ;
        }
    }

    if (scoreleftwrist>0.2) {
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if (song2_status==false) {
          song2.play();
          document.getElementById("song").innerHTML="Playing Peter Pan SONG" ;
        }
    }
   }
   
   function play() {
     song.play(); 
     song.setVolume(1);
     song.rate(1);
   }
   
   function gotPoses(results) {
     if (results.length>0) {
       console.log(results);
       leftwristX=results[0].pose.leftwrist.x;
       rightwristX=results[0].pose.rightwrist.x;
       leftwristY=results[0].pose.leftwrist.y;
       rightwristY=results[0].pose.rightwrist.y;
       scoreleftwrist=results[0].pose.keypoints[9].score;
       scorerightwrist=results[0].pose.keypoints[10].score;
     }
   }
   
   function modelLoaded() {
     console.log('modelLoaded');
   }
   
   