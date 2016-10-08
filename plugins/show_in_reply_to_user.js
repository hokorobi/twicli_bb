langResources["What\'s happening?"] = ['いまなにしてる？'];
langResources['Reply to $1'] = ['$1 への返信'];

(function () {

  // divをつくる
  var optionDiv = $('option');
  var dummy = document.createElement('div');
  dummy.innerHTML = '<div id="doing">' + _("What\'s happening?") + '</div>';
  optionDiv.insertBefore(dummy.firstChild, optionDiv.firstChild);
  
  // setReplyId関数をフック
  var setReplyId_original = setReplyId;
  setReplyId = function (id) {
    setReplyId_original(id);
    var message = id ? _('Reply to $1', '@'+in_reply_to_user) : _("What\'s happening?");
    $('doing').innerHTML = message;
  }
  
  // registerPlugin({ init: makeDoingDiv });

})();
