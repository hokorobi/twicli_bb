// ==UserScript==
// @name twicli post canceler
// @namespace http://efcl.info/
// @description twicliのポストを行うのに5秒の猶予を設けて、その間にキャンセルボタンを押せばポストをキャンセルできます。
// @author azu
// @homepage http://efcl.info/
// @twitter https://twitter.com/azu_re
// ==/UserScript==
/* http://gist.github.com/567983.txt をプラグインにロード */

// オリジナルからの変更点。
// - esc キーでキャンセルできるように。
// - キャンセル可能な残り時間を出すように。

(function(){
var DELAY_TIME = 5000; //デフォルト5秒

var addEvent, removeEvent; //変数を宣言
if (document.addEventListener) {
    //addEventListenerが使える場合(IE以外)
    addEvent = function(node, type, handler) {
        node.addEventListener(type, handler, false);
    };
    removeEvent = function(node, type, handler) {
        node.removeEventListener(type, handler, false);
    };
} else if (document.attachEvent) { // IE用
    addEvent = function(node, type, handler) {
        node.attachEvent('on' + type, function(evt) {
            handler.call(node, evt);
        });
    };
    removeEvent = function(node, type, handler) {
        node.detachEvent('on' + type, function(evt) {
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
        button.setAttribute("style", "position:fixed;top:0;right:0;width: 5em;margin: 5px;padding: 10px;z-index:333;");
        function cancel(e) {
            var keyCode = (e.keyCode || e.charCode || e.which);
            if (!keyCode || keyCode === 27) {
                window.clearTimeout(timeID);
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                removeEvent($('fst'), 'keypress', cancel);
                postCancel.remove();
            }
        }
        addEvent(button , "click", cancel);
        addEvent($('fst'), 'keypress', cancel);
        var time_end = DELAY_TIME + (+new Date);
        setTimeout(function(){
            button.innerHTML = Math.floor((time_end - (+new Date)) / 100) / 10;
            setTimeout(arguments.callee, 50);
        }, 50);
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
        e.preventDefault && e.preventDefault();
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
