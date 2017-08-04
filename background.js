var user_id = "7114113888111";
var dates = [];

function playSound(){
  $("#play").play();
}
function sched_rm(evt){ //posts message requests to server
    //console.log("sending message to server");
    $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php',{id: user_id, rm: evt}, function(evt){
          console.log(evt);
          update();
    });
}
function update(){ //requests new messages from server (automatically every 10s)
    //console.log(user_id);
    $.get('http://ciaracoding.16mb.com/Scheduler/scheduler.php', {id: user_id, req: "all"}, function(evts){
      if(evts){
        //console.log(evt_total);
        evt_total = 0;
        evts = evts.split('\t');
        console.log(evts);
        $(".events").html('');
        for(var i = 0; i < evts.length; i++){
          var evt = evts[i];
          dates.append(evt.split(": "));
        }
      }

    });

}

function reminder(){
  let now = new Date();
  now = now.toLocaleString();
  console.log(dates);
  for(let i = 0; i < dates.length; i++){
    let date = dates[i][1]
    diff = date - now;
    if(diff < 0){
      sched_rm(dates[i][0] + ": " + dates[i][1])
    }
    else if(diff < 500){
      playSound();
    }
  }
}
function main(){
    setInterval(update, 50);
    setInterval(reminder, 100);
    $('<audio id="play" src="https://www.soundjay.com/button/beep-07.wav"></audio>').prependTo('body');

}
$(document).ready(main);
