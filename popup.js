var evt_total;
var user_id = "7114113888111";
function sched_send(evt){ //posts message requests to server
    //console.log("sending message to server");
    //console.log(user_id);
    $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php',{id: user_id, send: evt}, function(evt){
          //console.log(evt);
          update();
          $("textarea").val("");
          $("#Event").focus();
    });

}
function sched_rm(evt){ //posts message requests to server
    //console.log("sending message to server");
    $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php',{id: user_id, rm: evt}, function(evt){
          //console.log(evt);
          update();
    });
}
function getNumEvents(){
  $.post('http://ciaracoding.16mb.com/Scheduler/scheduler.php', {id: user_id, req: "reset"}, function(num){
    evt_total = num;
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
          $('<li>').text(evt).prependTo('.events');
          evt_total++;
        }
      }

    });

}
function assert(cond, txt = "Assertion Exception"){
  if(cond) return;
  throw new Error(txt);
}

function main(){
  evt_total = getNumEvents();
  update();
  var repeat = setInterval(update, 2000);
  var form = $(this).closest("form");
  form.action = "#";
  $("#Date").keypress(function (e) {
      try{
      //TODO: Validate that all entered dates are valid dates
      let test = Date.parse($(this).val());
      if(e.which == 13 && !e.shiftKey && $("#Event").val() !== '') {
          e.preventDefault();
          assert(!Number.isNaN( test ));
          date = new Date(test);
          date = date.toLocaleString();
          var txt = $("#Event").val() + ": " + date;
          sched_send(txt);


      }
      else if(e.which == 13 && !e.shiftKey){
          assert(!Number.isNaN( date ));
          $("#Event").focus();
      }
    }
    catch(err){
      alert("Invalid Date entered");
      console.error(err);
    }
  });
    $("#Event").keypress(function (e) {
      try{
        if(e.which == 13 && !e.shiftKey && $("#Date").val() !== '') {
          e.preventDefault();
          test = Date.parse($("#Date").val());
          assert(!Number.isNaN( test ));
          date = new Date(test);
          date = date.toLocaleString();
          var txt = $(this).val() + ": " + date;
          sched_send(txt);

        }
        else if(e.which == 13 && !e.shiftKey){
            $("#Date").focus();
        }
      }
      catch(err){
        alert("Invalid Date entered");
        console.error(err);
      }
  });
  $(document).on("click", "li", function(){
      let entry = $(this).text();
      sched_rm(entry);
      $(this).remove();
      console.log(entry + " Deleted");
      //Send message that task is completed



  } );


}


$(document).ready(main);
