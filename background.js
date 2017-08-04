var user_id = "7114113888111";
var dates = [];

function playSound(){
  document.getElementById("play").play();
}
function sched_rm(evt){ //posts message requests to server
    //console.log("sending message to server");
    $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php',{id: user_id, rm: evt}, function(evt){
          //console.log(evt);
          update();
    });
}
function update(){ //requests new messages from server (automatically every 10s)
    $.get('http://ciaracoding.16mb.com/Scheduler/scheduler.php', {id: user_id, req: "all"}, function(evts){
      if(evts){
        //console.log(evt_total);
        evt_total = 0;
        evts = evts.split('\t');
        dates.length = 0;
        for(var i = 0; i < evts.length; i++){
          var evt = evts[i];
          dates.push(evt.split(": "));
        }
      }

    });

}

function reminder(){
  let now = new Date();
  //now = now.toLocaleString();
  //console.log(dates);
  for(let i = 0; i < dates.length; i++){
    let date = new Date(dates[i][1]);
    diff = date - now;
    //console.log(diff)
    if(diff < 0){
      let s = dates[i][0] + ": " + dates[i][1];
      alert(s + " is due");
      sched_rm(s);
    }
    else if(/*diff < 60000 && diff > 59500 ||*/ diff < 500 ){
      playSound();
    }
  }
}
function main(){
    setInterval(update, 500);
    setInterval(reminder, 200);
}
$(document).ready(main);
