var evt_total;
function sched_send(evt){ //posts message requests to server
    console.log("sending message to server");
    $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php',{send: evt}, function(evt){
          console.log(evt);
    });
}
function sched_rm(evt){ //posts message requests to server
    console.log("sending message to server");
    $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php',{rm: evt}, function(evt){
          console.log(evt);
    });
}
function getNumEvents(){
  $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php', {req: "reset"}, function(num){
    evt_total = num;
  });

}
function update(){ //requests new messages from server (automatically every 10s)
    $.get('http://ciaracoding.16mb.com/Scheduler/scheduler.php', {req: "all"}, function(evts){
      if(evts){
        console.log(evt_total);
        evt_total = 0;
        evts = evts.split('\t');
        $(".events").html('');
        for(var i = 0; i < evts.length; i++){
          var evt = evts[i];
          $('<li>').text(evt).prependTo('.events');
          evt_total++;
        }
      }

    });

}


function main(){
  evt_total = getNumEvents();
  update();
  var form = $(this).closest("form");
  form.action = "#";
  $("#Date").keypress(function (e) {
      //TODO: Validate that all entered dates are valid dates 
      if(e.which == 13) {console.log("space");}
      if(e.which == 13 && !e.shiftKey && $("#Event").val() !== '') {
          var txt = $("#Event").val() + " on " + $(this).val();
          e.preventDefault();
          sched_send(txt);
          //form.submit();
          //return false;
      }
  });
  $("#Event").keypress(function (e) {
      if(e.keyCode == 13) {console.log("space");}
      if(e.which == 13 && !e.shiftKey && $("#Date").val() !== '') {
          var txt = $(this).val() + " on " + $("#Date").val();
          e.preventDefault();
          sched_send(txt);
          //form.submit();
          //return false;
      }
  });
  $(document).on("click", "li", function(){
      console.log("click");
      sched_rm();
      //Send message that task is completed



  } );


}


$(document).ready(main);
