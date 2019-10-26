var versionID = "0.1-alpha";

var timingData = [];

window.onload = function() {
  console.log("TimerApp v" + versionID + "  main.js is loaded.");

  /*window.addEventListener("click", function(e){
    bing();
  });*/



}

var startTime = 0;

function startTiming(){
  for (pair of document.getElementById('timerPattern').value.replace(/ /gi, "").split(";")) {
    if(pair == "")
    continue;
    let temp = pair.split("x");
    if(temp.length == 1){
      timingData.push([1, temp[0]]);
    }else{
      timingData.push([temp[0], temp[1]]);
    }
  }
  console.log(timingData);

  startTime = Date.now();
  nextWait();
}

var j = 0;
var i = 0;

function nextWait(){
  if(j < timingData.length){
    timer = timingData[j];
    //console.log("i, j", i, j);
    //console.log("timer0", timer[0]);
    if(i < timer[0]){
      countDown(timer[1]);
    }else{
      i = -1;
      j++;
      nextWait();
    }
    i++;
  }else{
    console.log("Finished");
  }
}

var goal = 0;

function countDown(sec){
  goal = Date.now() + sec * 1000 + 1000;
  var interv = setInterval(function(){
    if(updateDisplay()){
      bing();
      nextWait();
      clearInterval(interv);
    }
  }, 30);
}

var cutMillis = false;

function toggleMillis(el){
  cutMillis = !el.checked;
}

function updateDisplay(){
  var uf = getUpdateSecondDisplay();
  var offset = new Date(goal - Date.now());
  if(offset < 900){
    return true;
  }else{
    var timestring = getTrailingZero(offset.getUTCHours() * (offset.getUTCDate() - 1)) + ":" + getTrailingZero(offset.getUTCMinutes()) + ":" + getTrailingZero(offset.getUTCSeconds());
    if(!cutMillis)
      timestring = getTrailingZero(offset.getUTCHours() * (offset.getUTCDate() - 1)) + ":" + getTrailingZero(offset.getUTCMinutes()) + ":" + getTrailingZero(offset.getUTCSeconds()) + "." + getTrailingZero(Math.floor(offset.getMilliseconds()/10));
    document.getElementById('timedisplay').innerHTML = timestring;
    uf();
    //if(offset.getUTCSeconds() == 0) return true;
    return false;
  }
}

function getUpdateSecondDisplay(){
  var offset = new Date(Date.now() - startTime);

  var timestring = getTrailingZero(offset.getUTCHours() * (offset.getUTCDate() - 1)) + ":" + getTrailingZero(offset.getUTCMinutes()) + ":" + getTrailingZero(offset.getUTCSeconds());
  if(!cutMillis)
    timestring = getTrailingZero(offset.getUTCHours() * (offset.getUTCDate() - 1)) + ":" + getTrailingZero(offset.getUTCMinutes()) + ":" + getTrailingZero(offset.getUTCSeconds()) + "." + getTrailingZero(Math.floor(offset.getMilliseconds()/10));
  return function(){
    document.getElementById('timedisplay2').innerHTML = timestring;
  };
}


function getTrailingZero(nbr){
  return nbr < 10 ? "0"+nbr : nbr;
}

function getLeadingZero(nbr){
  return (nbr - (Math.floor(nbr/10)*10)) == 0 ? nbr+"0" : nbr;
}

function bing(){
  var audio = new Audio('rsc/sound.ogg');
  audio.play();
}
