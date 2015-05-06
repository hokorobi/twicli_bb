(function(){
	var res = [
		{search: /^https?:\/\/(?:\w+\.)?theta360\.com\/(?:[sm]\/\w+|spheres\/samples\/[a-z0-9-]+)/,
			replace: "$&/", type: "theta"},
		{search: /^https?:\/\/(?:\w+\.)?pinterest\.com\/pin\/\d+/,
			replace: "$&/", type: "pin"},
		{search: /^https?:\/\/vine\.co\/v\/(\w+)$/, replace: "https://vine.co/v/$1/embed/simple", type: "iframe"},
		{search: /^https?:\/\/amp\.twimg\.com\/v\/([\w-]+)$/, replace: "https://amp.twimg.com/v/$1", type: "iframe"},
		{search: /^https?:\/\/movapic\.com\/pic\/([\w]+)$/, replace: "http://image.movapic.com/pic/m_$1.jpeg", type: "iframe"},
		{search: /^https?:\/\/ow\.ly\/i\/([\w]+)$/, replace: "http://static.ow.ly/photos/normal/$1.jpg", type: "iframe"},
		{search: /^https?:\/\/vimeo\.com\/(?:m\/)?(\d+)$/, replace: "https://player.vimeo.com/video/$1", type: "iframe"}
	];

	var createAnchor = function(link, onclick) {
		var a = document.createElement('a');
		a.className = "button";
		a.href = "#";
		a.onclick = onclick;
		a.innerHTML = '<img src="images/jump.png" alt="☞" width="14" height="14">';
		link.parentNode.insertBefore(a, link.nextSibling);
	};

	registerPlugin({
		newMessageElement: function(elem) {
			var status = null;
			for(var i = 0; i < elem.childNodes.length; i++) {
				status = elem.childNodes[i];
				if (status.className && status.className.indexOf('status') >= 0)
					break;
			}
			var links = status.getElementsByTagName('a');
			var url;
			for (var i = 0; i < links.length; i++) {
				url = links[i].href;
				this.replaceUrl(null, links[i], url, url);
			}
		},
		replaceUrl : function(elem, link, lng, sht) {
			if (link.embedsrc) return;
			for (var i = 0; i < res.length; i++) {
				if (res[i].search.test(lng)) {
					link.embedsrc = true;
					createAnchor(link, function(){
						dispEmbedSrc(lng.replace(res[i].search, res[i].replace), link, res[i].type);
						return false;
					});
					return;
				}
			}
		}
	});
}());

function dispEmbedSrc(url, link, type) {
	rep_top = Math.max(cumulativeOffset(link)[1] + 20, $("control").offsetHeight);
	var win_h = window.innerHeight || document.documentElement.clientHeight;
	$('rep').style.display = "block";
	var ifr = document.createElement("iframe");
	ifr.id = "embedsrc";
	ifr.style.border = "0";
	ifr.style.width = "100%";
	ifr.style.height = "426px";
	ifr.style.display = "block";
	switch (type) {
		case 'iframe':
			ifr.src = url;
			ifr.style.height = Math.ceil(win_h * 0.5) + "px";
			$('reps').appendChild(ifr);
			break;
		case 'script':
			$('reps').appendChild(ifr);
			ifr.contentWindow.document.write(
					'<div><scr' + 'ipt type="text/javascript" src="' + url +
					'"></scr' + 'ipt></div>');
			break;
		case 'pin':
			$('reps').appendChild(ifr);
			ifr.contentWindow.document.write(
					'<div><a data-pin-do="embedPin" href="' + url
					+ '"></a><scr'
					+ 'ipt type="text/javascript" async src="//assets.pinterest.com/js/pinit.js"></scr'
					+ 'ipt></div>');
			break;
		case 'theta':
			$('reps').appendChild(ifr);
			ifr.contentWindow.document.write(
					'<div class="ricoh-theta-spherical-image" ><a href="' + url
					+ '" target="_blank"></a></div><scr'
					+ 'ipt async src="https://theta360.com/widgets.js" charset="utf-8"></scr'
					+ 'ipt>');
			break;
	}
	$('rep').style.top = rep_top;
	scrollToDiv($('rep'));
	user_pick1 = user_pick2 = null;
}
