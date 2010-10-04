(function(){
	var res = [
		{search: /^(https?:\/\/gist\.github\.com\/\d+)$/, replace: "$1.pibb"}
	];

	registerPlugin({
		newMessageElement: function(elem) {
			var status = null;
			for(var i = 0; i < elem.childNodes.length; i++) {
				status = elem.childNodes[i];
				if (status.className && status.className.indexOf('status') >= 0)
					break;
			}
			var links = status.getElementsByTagName('a');
			for (var i = 0; i < links.length; i++) {
				url = links[i].href;
				this.replaceUrl(null, links[i], url, url);
			}
		},
		replaceUrl : function(elem, link, lng, sht) {
			var div, a;
			for (var i = 0; i < res.length; i++) {
				if (res[i].search.test(lng)) {
					if (link) {
						var div = document.createElement('div');
						var a = document.createElement('a');
						a.class = "button";
						a.href = "#";
						a.onclick = function(){
							dispEmbedSrc(lng.replace(res[i].search, res[i].replace), link);
							return false;
						};
						a.innerHTML = '<img src="images/inrep.png" alt="☞" width="14" height="14">';
						div.appendChild(a);
						link.parentNode.insertBefore(div.firstChild, link.nextSibling);
					}
				}
				break;
			}
		}
	});

}());

function dispEmbedSrc(url, elem) {
	var rep_top = Math.max(cumulativeOffset(elem)[1] + 20, $("control").offsetHeight);

	var iframe = $('embedsrc');
	if (iframe) iframe.parentNode.removeChild(iframe);

	iframe = document.createElement("iframe");
	iframe.id = "embedsrc";
	iframe.src = url;
	$('reps').appendChild(iframe);
	iframe.style.width = "100%";
	iframe.style.display = "block";
	$('rep').style.display = "block";
	$('rep').style.top = rep_top;
	user_pick1 = user_pick2 = null;
}
