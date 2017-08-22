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
    let s = dates[i][0] + ": " + dates[i][1];
    if(diff < 0){
      sched_rm(s);

    }
    else if(/*diff < 60000 && diff > 59500 ||*/ diff < 500 ){
      playSound();
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {actn: "notify", evt: "s"},
          response => {
            ;
          }
        );
      });
      //alert(s + " is due");
    }
  }
}
function main(){
    setInterval(update, 250);
    setInterval(reminder, 300);
}
$(document).ready(main);
