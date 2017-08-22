

function notify(s){
  $("#ntfy").val(s);
  $("#ntfy").dialog("open");
}



var main = () => {
  $("body").append('<div id="ntfy"></div>');
  $("#ntfy").dialog({
    modal:true,
    autoOpen: false,
    buttons: {
        Ok: function() {
            $( this ).dialog( "close" );
        },
        Extend: function(){
            $(this).dialog("close");
        }
    }
  });
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
      if(request.actn == "notify"){
        notify(request.evt);
      }

  });
}
$(document).ready(main);
