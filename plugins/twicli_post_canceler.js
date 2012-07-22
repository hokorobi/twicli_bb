// ==UserScript==
// @name twicli post canceler
// @namespace http://efcl.info/
// @description twicliのポストを行うのに5秒の猶予を設けて、その間にキャンセルボタンを押せばポストをキャンセルできます。
// @author azu
// @homepage http://efcl.info/
// @twitter https://twitter.com/azu_re
// ==/UserScript==
/* http://gist.github.com/567983.txt をプラグインにロード */
(function(){
var DELAY_TIME = 5000; //デフォルト5秒
    
var addEvent; //変数を宣言
if (document.addEventListener) {
    //addEventListenerが使える場合(IE以外)
    addEvent = function(node, type, handler) {
        node.addEventListener(type, handler, false);
    };
} else if (document.attachEvent) { // IE用
    addEvent = function(node, type, handler) {
        node.attachEvent('on' + type, function(evt) {
            handler.call(node, evt);
        });
    };
}
// キャンセルボタン
var postCancel = {
    id: "post_cencel",
    append: function(timeID) {
        var button = document.createElement("button");
        button.id = postCancel.id;
        button.setAttribute("style", "position:fixed;top:1px;right:1px;box-shadow: 0 1px 5px #0061aa, inset 0 10px 20px #b6f9ff;-webkit-box-shadow: 0 1px 5px #0061aa, inset 0 10px 20px #b6f9ff;-moz-box-shadow: 0 1px 5px #0061aa, inset 0 10px 20px #b6f9ff;width: 100px;margin: 5px;padding: 0;background: #6fb2e5;z-index:333;")
        addEvent(button , "click", function() {
            window.clearTimeout(timeID);
            postCancel.remove();
        }, false);
        button.appendChild(document.createTextNode("送信キャンセル"));
        document.body.appendChild(button);
    },
    remove: function() {
        var target = $(postCancel.id);
        document.body.removeChild(target);
    }
}
// targetの実行前にbeforeを実行して,msec後にtargetを実行する
function addDelayforPress(before, msec) {
    var original = window.press;
    window.press = function(e) {
        if (e != 1) key_press_detected = true;
        if (e != 1 && (e.keyCode != 13 && e.keyCode != 10 || !decr_enter && (e.ctrlKey || e.shiftKey) || decr_enter && !(e.ctrlKey || e.shiftKey))) return true;
        var st = document.frm.status;
        if (st.value == '') {
            $("loading").style.display = "block";
            update();
            return false;
        }
        var args = arguments;
        var timeID = setTimeout(function() {
            original.apply(window, args);
            postCancel.remove();
        }, msec);
        if (before) before.call(window, timeID);
    }
}
addDelayforPress(function(id) {
    postCancel.append(id);
}, DELAY_TIME);

})();
