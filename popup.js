function main(){
  $("#Date").keypress(function (e) {
      if(e.which == 13) console.log("space");
      if(e.which == 13 && !e.shiftKey && $("#Event").val() !== '') {
          var txt = $("#Event").val() + " on " + $(this).val();
          //$(this).closest("form").submit(); //send message to server
          e.preventDefault();
          $('<li>').text(txt).prependTo('.events');
          return false;
      }
  });
  $("#Event").keypress(function (e) {
      if(e.keyCode == 13) console.log("space");
      if(e.which == 13 && !e.shiftKey && $("#Date").val() !== '') {
          var txt = $(this).val() + " on " + $("#Date").val();
          //$(this).closest("form").submit(); //send message to server
          e.preventDefault();
          $('<li>').text(txt).prependTo('.events');
          return false;
      }
  });
  $(document).on("click", "li", function(){
      console.log("click");
      $(this).remove();
      //Send message that task is completed



  } );


}


$(document).ready(main);
